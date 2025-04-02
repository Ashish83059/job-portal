import { useState, useRef, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import CommentCard from "./commentCard";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";
import sanityClient from "@sanity/client";

// ✅ Ensure the correct Sanity project ID
const client = sanityClient({
    projectId: 'your-correct-project-id',  // ✅ Replace with actual project ID
    dataset: 'your_dataset',
    apiVersion: '2024-03-31',
    useCdn: true,
});

const imageUrlRegex = /\b(https?:\/\/[^\s]+)/g;

const config = {
  url: `${process.env.REACT_APP_BASE_URL}`,
  method: "post",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  },
};

export default function Discussion() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();
  const [commentList, setCommentList] = useState([]);  // ✅ Default to an empty array
  const [urlList, setUrlList] = useState([]);

  // ✅ Handle form submission correctly
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || commentRef.current.innerText.trim() === "") {
      window.alert("Enter your name and comment");
      return;
    }

    const newComment = {
      name,
      content: commentRef.current.innerText.trim(),
      rating,
      _type: "Comment",
    };

    axios({
      ...config,
      data: {
        mutations: [
          {
            create: newComment,
          },
        ],
      },
    })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    setCommentList([newComment, ...commentList]); // ✅ Proper state update
    setName("");
    setImageUrl("");
    commentRef.current.innerText = "";
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    const value = e.currentTarget.innerText;
    if (!value.trim()) {
      setUrlList([]);
      setImageUrl("");
      return;
    }

    const matchedUrls = value.match(imageUrlRegex);
    setUrlList(matchedUrls || []);
  };

  useEffect(() => {
    setImageUrl(urlList.length > 0 ? urlList[0] : "");
  }, [urlList]);

  // ✅ Corrected comment deletion logic
  const deleteComment = (id) => {
    axios({
      ...config,
      data: {
        mutations: [
          {
            delete: {
              id: id,
            },
          },
        ],
      },
    })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    setCommentList(commentList.filter((comment) => comment._id !== id)); // ✅ Correct deletion
  };

  // ✅ Fetch comments correctly from Sanity
  useEffect(() => {
    client
      .fetch(
        `*[_type == "Comment"] | order(_createdAt desc) {
          _id,
          name,
          content,
          rating
        }`
      )
      .then((fetchedComments) => setCommentList(fetchedComments))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div className="discussion">
        <div className="right">
          <div className="discuss">JOB DISQUS</div>

          <form className="comment-form">
            <div className="input-group">
              <div className="comment-name">
                <div className="line"> {commentList.length} Comments</div>
                <div className="icon-name">
                  <div className="user-icon">
                    <BiUserCircle />
                  </div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="star-rating">
              <div className="rating-text">You rated this </div>
              <StarRating onChange={setRating} />
            </div>
            <div className="input-group">
              <div
                type="text"
                className="form-control comment"
                contentEditable="true"
                data-testid="comment-section-test"
                data-placeholder="Join the discussion..."
                onInput={handleCommentChange}
                ref={commentRef}
              />
              <div className="icon-button">
                <Editor onUrlChange={setUrlList} commentRef={commentRef} />
                <button
                  className="submit"
                  data-testid="reset-comment"
                  onClick={handleSubmit}
                >
                  Comment
                </button>
              </div>
              <div className="only-image">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    data-testid="image-preview"
                    className="image-text-editor"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-box">
          {commentList.map((comment) => (
            <CommentCard
              key={comment._id}
              value={comment}
              deleteComment={() => deleteComment(comment._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
