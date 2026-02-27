import { Link } from "react-router-dom";

export default function PostCard({ post, currentUserId, onLike }) {
  const isLiked = post.likes?.some((id) => id === currentUserId || id?._id === currentUserId);

  return (
    <article className="card post-card">
      <div className="post-head">
        <Link to={`/profile/${post.author?._id || post.author?.id}`} className="post-author">
          {post.author?.name || "Unknown User"}
        </Link>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className={isLiked ? "btn-primary" : "btn-outline"} onClick={() => onLike(post._id)} type="button">
          {isLiked ? "Liked" : "Like"}
        </button>
        <span>{post.likes?.length || 0} likes</span>
      </div>
    </article>
  );
}
