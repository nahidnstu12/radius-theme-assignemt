import PostForm from "@/@core/components/post-form";
import { createPost } from "@/@core/db/actions/posts";

export default function PostsCreate() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostForm
          formAction={createPost}
          initialData={{ title: "", content: "" }}
        />
      </div>
    </main>
  );
}
