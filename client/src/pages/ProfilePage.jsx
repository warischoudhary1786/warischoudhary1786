import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileById, updateMyProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, setUser } = useAuth();
  const isOwnProfile = useMemo(() => user?.id === userId, [user?.id, userId]);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", bio: "", skills: "" });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setError("");
        const data = await getProfileById(userId);
        setProfile(data);
        setForm({
          name: data.name || "",
          bio: data.bio || "",
          skills: (data.skills || []).join(", ")
        });
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load profile");
      }
    }

    loadProfile();
  }, [userId]);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        bio: form.bio,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      };

      const updated = await updateMyProfile(payload);
      setProfile(updated);
      setUser((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <section className="page-shell">Loading profile...</section>;

  return (
    <section className="page-shell">
      <div className="card profile-card">
        {!editing ? (
          <>
            <h1>{profile.name}</h1>
            <p className="muted">{profile.bio || "No bio added yet."}</p>
            <div className="skills-wrap">
              {(profile.skills || []).length ? (
                profile.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))
              ) : (
                <span className="muted">No skills listed.</span>
              )}
            </div>
            {isOwnProfile && (
              <button className="btn-primary" onClick={() => setEditing(true)} type="button">
                Edit Profile
              </button>
            )}
          </>
        ) : (
          <form className="profile-form" onSubmit={onSubmit}>
            <h1>Edit profile</h1>
            <input name="name" onChange={onChange} required value={form.name} />
            <textarea name="bio" onChange={onChange} rows={4} value={form.bio} />
            <input
              name="skills"
              onChange={onChange}
              placeholder="e.g. React, Node.js, MongoDB"
              value={form.skills}
            />
            {error && <p className="error-text">{error}</p>}
            <div className="profile-actions">
              <button className="btn-primary" disabled={saving} type="submit">
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn-outline" onClick={() => setEditing(false)} type="button">
                Cancel
              </button>
            </div>
          </form>
        )}
        {error && !editing && <p className="error-text">{error}</p>}
      </div>
    </section>
  );
}
