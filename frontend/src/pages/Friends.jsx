// src/pages/Friends.jsx
import React, { useState, useEffect } from "react";

const Friends = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); 
        const data = await response.json();
        setUsers(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers(); 
  }, []); 

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <h1 className="text-3xl font-bold">Friends</h1>
      <p>Here you can see the users of the application.</p>
      
      {loading ? (
        <p>Loading...</p> 
      ) : (
        <div className="mt-4">
          {users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user.id} className="mb-2">
                  <div className="p-4 bg-gray-800 rounded">
                    <h2 className="text-xl">{user.name}</h2>
                    <p className="text-gray-400">{user.email}</p>
                    {/* TODO*/}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;
