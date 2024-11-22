import NoDataFoundComponent from "@/@core/components/NoDataFoundComponent";
import { fetchPosts } from "@/@core/db/queries/posts";

export default async function Home() {
  const posts = await fetchPosts();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="max-w-screen-xl mx-auto p-16">
      {posts?.length == 0 ? (
        <NoDataFoundComponent />
      ) : (
        <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
          {posts?.map((post) => (
            <div
              className="hover:bg-gray-700 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
              key={post.id}
            >
              <div className="py-4 px-8">
                <h4 className="text-lg mb-3 font-semibold">{post?.title}</h4>
                <p className="mb-2 text-sm text-gray-600">
                  {post?.content.length > 100
                    ? post?.content.substring(0, 100) + "..."
                    : post?.content}
                </p>
                {post?.imagePath && (
                  <img src={post?.imagePath} className="w-100" />
                )}
                <hr className="mt-4" />
                <span className="text-xs block">{post?.user?.name}</span>
                <span className="text-xs">
                  {"Updated at " +
                    post.updatedAt.toLocaleDateString("en-US", dateOptions)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
