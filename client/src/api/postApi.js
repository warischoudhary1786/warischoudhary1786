import api from "./client";

export async function getFeed(page = 1, limit = 20) {
  const { data } = await api.get(`/posts/feed?page=${page}&limit=${limit}`);
  return data;
}

export async function createPost(content) {
  const { data } = await api.post("/posts", { content });
  return data.post;
}

export async function togglePostLike(postId) {
  const { data } = await api.patch(`/posts/${postId}/like`);
  return data;
}
