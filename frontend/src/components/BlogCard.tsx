import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition w-full max-w-2xl bg-white cursor-pointer mt-4">
        {/* Author Row */}
        <div className="flex items-center text-sm text-gray-600">
          <Avatar name={authorName} />
          <span className="ml-2 font-medium">{authorName}</span>
          <Circle />
          <span className="ml-2 text-gray-500">{publishedDate}</span>
        </div>

        {/* Title */}
        <div className="text-2xl font-bold text-gray-900 mt-4">{title}</div>

        {/* Content */}
        <div className="text-md font-thin line-clamp-3">
        {content}
        </div>


        {/* Read Time */}
        <div className="text-gray-500 text-sm mt-4">
          {`${Math.ceil(content.length / 150)} ${Math.ceil(content.length / 150) > 1 ? "minutes" : "minute"} read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="mx-2 h-1.5 w-1.5 rounded-full bg-gray-400" />;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-800 rounded-full ${
        size === "small" ? "w-7 h-7" : "w-12 h-12"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-medium text-white`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
