import { useState } from "react";

import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 429) {
        toast.error("Slow down: You're creating notes too fast!", {
          duration: 4000,
          icon: "☠️",
        });
      } else {
        toast.error("Failed to create note. Please try again later!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to={"/"}
            className="btn btn-ghost rounded-full mb-6"
            aria-label="Back to notes"
          >
            <ArrowLeftIcon className="size-6" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-6">
                  <label className="label mb-1">
                    <span className="label-text">Title</span>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label mb-1">
                    <span className="label-text">Content</span>
                  </label>{" "}
                  <br />
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn bg-green-400 text-black rounded-full"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
