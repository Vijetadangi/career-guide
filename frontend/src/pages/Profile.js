import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <h1>👤 My Profile</h1>
      <p className="subtitle">View your account details</p>

      <div className="profile-card">
        <div className="profile-row">
          <span>Name</span>
          <strong>{user?.name || "N/A"}</strong>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>{user?.email || "N/A"}</strong>
        </div>

        <div className="profile-row">
          <span>Account Type</span>
          <strong>Student</strong>
        </div>

        <div className="profile-row">
          <span>Status</span>
          <strong className="active">Active</strong>
        </div>
      </div>

      <p className="note">
        Profile editing will be available in future updates.
      </p>
    </div>
  );
};

export default Profile;
