import { AppBar }  from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import TextEditor from "../components/TextEditor";

const DRAFT_KEY = "scribble_draft";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // HTML
  const navigate = useNavigate();

  // ✅ Restore draft on load
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.title) setTitle(draft.title);
        if (draft.content) setDescription(draft.content);
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  
  useEffect(() => {
    const draft = JSON.stringify({ title, content: description });
    localStorage.setItem(DRAFT_KEY, draft);
  }, [title, description]);

  async function handlePublish() {
    try {
      if (!title.trim() || !description.trim()) {
        alert("Title and content are required");
        return;
      }

      if (description.length > 20000) {
        alert("Content is too long. Please shorten your post.");
        return;
      }

      const safeHTML = DOMPurify.sanitize(description, {
        ALLOWED_TAGS: [], // forbid all tags
        ALLOWED_ATTR: []
      });

      console.log(safeHTML);

      const resp = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title: title.trim(), content: safeHTML },
        {
          headers: {
            Authorization: localStorage.getItem("token") ?? "",
          },
        }
      );

      // ✅ Clear draft after publish
      localStorage.removeItem(DRAFT_KEY);

      navigate(`/blog/${resp.data.id}`);
    } catch (err) {
      console.error("Failed to publish", err);
      alert("Something went wrong while publishing. Please try again.");
    }
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />

          <div className="mt-3">
            <TextEditor
              placeholder="Write an article…"
              onChangeHTML={(html) => setDescription(html)}
              initialContent={description} // pass restored HTML
            />
          </div>

          <button
            onClick={handlePublish}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};


export default Publish;