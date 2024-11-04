// src/components/Profile.js
import React, { useState } from 'react';

const Profile = () => {
 
  const [user, setUser] = useState({
    profileImage: 'https://via.placeholder.com/150', // Placeholder image
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  });


  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex items-center mb-4">
        <img src={user.profileImage} alt="Profile" className="rounded-full w-24 h-24 mr-4" />
        {isEditing ? (
          <input
            type="file"
            accept="image/*"
            className="hidden"
            // In a real application, handle image upload and preview
          />
        ) : (
          <div>
            <h2 className="text-xl">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{user.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        {isEditing ? (
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{user.password.replace(/./g, '*')}</p>
        )}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        {isEditing ? 'Cancel' : 'Edit'}
      </button>

      {isEditing && (
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      )}
    </div>
  );
};

export default Profile;
