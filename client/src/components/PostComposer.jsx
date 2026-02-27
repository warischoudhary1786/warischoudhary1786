import { useState } from "react";

export default function PostComposer({ onCreate, disabled }) {
  const [content, setContent] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim() || disabled) return;
    await onCreate(content.trim());
    setContent("");
  };

  return (
    <form className="card composer" onSubmit={submit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with your network..."
        maxLength={1000}
        rows={4}
      />
      <div className="composer-footer">
        <small>{content.length}/1000</small>
        <button className="btn-primary" disabled={disabled || !content.trim()} type="submit">
          Post
        </button>
      </div>
    </form>
  );
}
