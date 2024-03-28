import React, { useState } from "react";

const Onboarding = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customAvatar, setCustomAvatar] = useState(null);
  const handleSelectAvatar = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setCustomAvatar(null); // Clear any previously selected custom avatar
  };
  const handleCustomAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(null); // Clear any previously selected sample avatar
        setCustomAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>Select Avatar</h3>
      <div className="avatar-grid">
        {/* Render sample avatars */}
        <div
          className={`avatar-item ${selectedAvatar === "sample1.jpg" ? "selected" : ""}`}
          onClick={() => handleSelectAvatar("sample1.jpg")}
        >
          <img src="sample1.jpg" alt="Sample Avatar 1" />
        </div>
        {/* Add more sample avatars as needed */}

        {/* Render custom avatar upload */}
        <div className="avatar-item">
          <input
            type="file"
            accept="image/*"
            onChange={handleCustomAvatarUpload}
          />
          <label>Upload Custom Avatar</label>
        </div>
      </div>

      {/* Render selected avatar preview */}
      {selectedAvatar && (
        <div>
          <h4>Selected Avatar:</h4>
          <img src={selectedAvatar} alt="Selected Avatar" />
        </div>
      )}
      {customAvatar && (
        <div>
          <h4>Custom Avatar:</h4>
          <img src={customAvatar} alt="Custom Avatar" />
        </div>
      )}
    </div>
  );
};

export default Onboarding;
