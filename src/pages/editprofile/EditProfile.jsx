import { useState } from 'react';
import './editProfile.css';

const EditProfile = () => {
  const initialProfile = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    image: './assets/3.jpg',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editedProfile, setEditedProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    password: false,
    image: false,
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing({ name: false, username: false, password: false, image: false });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProfile({
      ...editedProfile,
      image: URL.createObjectURL(file),
    });
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing({ name: false, username: false, password: false, image: false });
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-preview">
            <img src={editedProfile.image} alt="Profile Preview" />
            {isEditing.image && (
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'block', marginTop: '10px' }}
              />
            )}
            <button
              type="button"
              className="edit-image-button"
              onClick={() => handleEdit('image')}
            >
              ✏️
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-edit-group">
              <input
                type="text"
                id="name"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                disabled={!isEditing.name}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => handleEdit('name')}
              >
                ✏️
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-edit-group">
              <input
                type="text"
                id="username"
                value={editedProfile.username}
                onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                disabled={!isEditing.username}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => handleEdit('username')}
              >
                ✏️
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-edit-group">
              <input
                type="password"
                id="password"
                value={editedProfile.password}
                onChange={(e) => setEditedProfile({ ...editedProfile, password: e.target.value })}
                disabled={!isEditing.password}
              />
              <button
                type="button"
                className="edit-button"
                onClick={() => handleEdit('password')}
              >
                ✏️
              </button>
            </div>
          </div>
          <div className="form-buttons">
            {(isEditing.name || isEditing.username || isEditing.password || isEditing.image) && (
              <>
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
