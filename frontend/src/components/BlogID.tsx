import type { Blog } from "../hooks/fetchBlogs";
import { Avatar } from "./BlogCard";

export const BlogID = ({ blog }: { blog: Blog }) => {
  console.log(blog);
  return (
    <div>
      <div className="flex justify-center px-6">
        <div className="w-full max-w-4xl py-16">
          {/* Blog Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-snug">
            {blog.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
            <Avatar size="small" name={blog.author.name || "Anonymous"} />
            <span className="font-medium text-gray-700">
              {blog.author.name || "Anonymous"}
            </span>
            <span>•</span>
            <span>2nd December 2023</span>
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg mt-10 text-gray-800 leading-relaxed">
            {blog.content}
          </article>

          {/* Divider */}
          <hr className="my-12 border-gray-200" />

          {/* Author Bio */}
          <div className="flex items-start gap-4">
            <Avatar size="big" name={blog.author.name || "Anonymous"} />
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {blog.author.name || "Anonymous"}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                Random catch phrase about the author’s ability to grab the
                user's attention. Add a 2-3 line short bio here for
                authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
