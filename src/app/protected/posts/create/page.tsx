import PostForm from "@/@core/components/PostForm";
import { createPost } from "@/@core/db/actions/posts";
import { LINK_USER_POST } from "@/@core/helpers/apiLinks";
import Link from "next/link";

export default function PostsCreate() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-12">
      <div className="mb-10 text-center lg:max-w-6xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href={LINK_USER_POST}
          className="mb-8 border border-gray-300 px-4 py-1 rounded"
        >
          Back
        </Link>
        <PostForm
          formAction={createPost}
          initialData={{ title: "", content: "", location: "" }}
        />
      </div>
    </main>
  );
}
