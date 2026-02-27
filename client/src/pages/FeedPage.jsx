import { useEffect, useState } from "react";
import { createPost, getFeed, togglePostLike } from "../api/postApi";
import PostCard from "../components/PostCard";
import PostComposer from "../components/PostComposer";
import { useAuth } from "../context/AuthContext";

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleCreate = async (content) => {
    try {
      setSaving(true);
      const post = await createPost(content);
      setPosts((prev) => [post, ...prev]);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create post");
    } finally {
      setSaving(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const result = await togglePostLike(postId);
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id !== postId) return post;
          const likes = Array.isArray(post.likes) ? [...post.likes] : [];
          const hasLiked = likes.some((id) => id === user?.id || id?._id === user?.id);

          let updatedLikes = likes;
          if (result.liked && !hasLiked) updatedLikes.push(user.id);
          if (!result.liked && hasLiked) {
            updatedLikes = likes.filter((id) => id !== user.id && id?._id !== user.id);
          }

          return { ...post, likes: updatedLikes };
        })
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update like");
    }
  };

  return (
    <section className="page-shell">
      <h1 className="page-title">Your Feed</h1>
      <PostComposer onCreate={handleCreate} disabled={saving} />
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading feed...</p>
      ) : posts.length ? (
        <div className="feed-list">
          {posts.map((post) => (
            <PostCard currentUserId={user?.id} key={post._id} onLike={handleLike} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts yet. Be the first to share an update.</p>
      )}
    </section>
  );
}
