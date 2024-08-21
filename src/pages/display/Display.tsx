import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Display.css';

interface User {
  _id: string;
  isUser: boolean;
  isCreator: boolean;
  isVerified: boolean;
  name: string;
  profileId: string | null;
  username: string;
  gender: string;
  profession: string | null;
  dob: string;
  number: string;
  mailAddress: string;
  bio: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
}

const Display: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/users');
        // Sort users by createdAt date
        const sortedUsers = response.data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setUsers(sortedUsers);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            {/* <th>isUser</th> */}
            <th>User Type</th>
            <th>Name</th>
            <th>Profile ID</th>
            <th>Username</th>
            <th>Gender</th>
            <th>Profession</th>
            <th>Date of Birth</th>
            <th>Number</th>
            <th>Email Address</th>
            <th>Bio</th>
            <th>Website</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>DEVIAN{index + 1}</td>
              {/* <td>{user.isUser ? 'Yes' : 'No'}</td> */}
              <td>{user.isCreator ? 'Creator' : 'Individual'}</td>
              <td>{user.name}</td>
              <td>{user.profileId}</td>
              <td>{user.username}</td>
              <td>{user.gender}</td>
              <td>{user.profession}</td>
              <td>{user.dob}</td>
              <td>{user.number}</td>
              <td>{user.mailAddress}</td>
              <td>{user.bio}</td>
              <td>{user.website}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{new Date(user.updatedAt).toLocaleString()}</td>
              <td>{user.isVerified ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
