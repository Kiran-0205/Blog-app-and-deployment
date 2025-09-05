import { BlogID } from "../components/BlogID";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/fetchBlogs";
import {useParams} from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <BlogID blog={blog} />
    </div>
}