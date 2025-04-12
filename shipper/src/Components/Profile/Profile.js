import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
    return (
        <div className="profile">
            <h2>Your Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default Profile;
