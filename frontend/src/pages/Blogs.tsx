import { useBlogs } from "../hooks/fetchBlogs";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";




function Blogs() {
  
    const {blogs, loading} = useBlogs();
    // console.log(blogs);
    if(loading){
        return (
            <div>
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
        )
    }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Sticky App Bar */}

      {/* Blog feed */}
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          {blogs.map((blog) => (
            <BlogCard
              key={blog?.id}
              id={blog?.id}
              authorName={"K"}
              title={blog?.title}
              content={blog?.content}
              publishedDate={"2025"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
