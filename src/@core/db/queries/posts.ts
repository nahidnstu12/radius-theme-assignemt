import { LINK_LOGIN } from "@/@core/helpers/apiLinks";
import { USER_ROLE } from "@/@core/helpers/enum";
import { verifyAuth } from "@/@core/lib/auth";
import { Post } from "@prisma/client";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { db } from "..";
import { PostWithUser } from "@/@core/helpers/types";

export async function fetchPosts(): Promise<PostWithUser[]> {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect(LINK_LOGIN);
  }

  const user = await verifyAuth(token);
  if (!user) {
    redirect(LINK_LOGIN);
  }

  try {
    const posts =
      user.role === USER_ROLE.ADMIN
        ? await db.post.findMany({
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
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
                  name: true,
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
