import api from "./client";

export async function getProfileById(userId) {
  const { data } = await api.get(`/profile/${userId}`);
  return data.profile;
}

export async function updateMyProfile(payload) {
  const { data } = await api.put("/profile/me", payload);
  return data.profile;
}
