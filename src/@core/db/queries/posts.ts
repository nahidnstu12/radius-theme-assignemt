import { verifyAuth } from "@/@core/lib/auth";
import { db } from "@/db";
import { Post } from "@prisma/client";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function fetchPosts(): Promise<Post[]> {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  const user = await verifyAuth(token);
  if (!user) {
    redirect("/login");
  }

  try {
    const posts =
      user.role === "ADMIN"
        ? await db.post.findMany({
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          })
        : await db.post.findMany({
            where: {
              userId: String(user.userId),
            },
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
export async function fetchPostById(id: string): Promise<Post | null> {
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
