import React, { useState, useRef } from "react";
import "./index.css";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";

const Reply = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();

  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !commentRef.current.innerText.trim()) {
      alert("Please enter your name and comment.");
      return;
    }
    onAdd(name, commentRef.current.innerHTML);
    setName("");
    commentRef.current.innerText = "";
  };

  const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i;
  const handleCommentChange = () => {
    const text = commentRef.current.innerText;
    const matchedUrl = text.match(imageUrlRegex);
    setImageUrl(matchedUrl ? matchedUrl[0] : "");
  };

  return (
    <div>
      <form className="comments-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="comments-name">
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
        <div className="input-group">
          <div
            className="form-control comments"
            contentEditable="true"
            data-placeholder="Join the discussion..."
            onInput={handleCommentChange}
            ref={commentRef}
          />
          <div className="icon-button">
            <Editor onUrlChange={setImageUrl} commentRef={commentRef} />
            <button type="submit" className="submit">
              Comment
            </button>
          </div>
          <div className="only-image">
            {imageUrl && <img src={imageUrl} alt="" className="image-preview" />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reply;
