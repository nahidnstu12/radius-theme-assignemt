"use server";

import { LINK_LOGIN, LINK_USER_POST } from "@/@core/helpers/apiLinks";
import { verifyAuth } from "@/@core/lib/auth";
import { uploadNewFile } from "@/@core/lib/uploadImage";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../index";

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  location: z.string().min(1),
  image: z.instanceof(File).optional(),
});

export async function createPost(formState: any, formData: FormData) {
  const token = cookies().get("token")?.value;
  if (!token) redirect(LINK_LOGIN);

  const user = await verifyAuth(token);
  if (!user) redirect(LINK_LOGIN);

  const imageFile = formData.get("image") as File;
  let imagePath = "";

  if (imageFile?.size > 0) {
    imagePath = await uploadNewFile(imageFile, String(user.userId));
  }

  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    location: formData.get("location"),
    image: imageFile,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: String(user.userId),
        location: result.data.location,
        imagePath: imagePath,
      },
    });

    if (post) {
      revalidatePath(LINK_USER_POST);
    //   redirect(LINK_USER_POST);
      return { message: "Post created Successfully!" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log({ errors: { _form: [error.message] } });

      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }
}
