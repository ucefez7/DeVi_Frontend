import React, { useEffect, useState } from 'react';
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import axios from 'axios';
import "./users.scss";

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

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "User ID",
    width: 90,
  },
  {
    field: "isCreator",
    headerName: "User Type",
    width: 90,
    valueGetter: (params) => (params.row.isCreator ? "Creator" : "Individual"),
  },
  {
    field: "name",
    headerName: "Full Name",
    width: 120,
  },
  // {
  //   field: "profileId",
  //   headerName: "Profile ID",
  //   width: 120,
  // },
  {
    field: "username",
    headerName: "Username",
    width: 120,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },
  {
    field: "profession",
    headerName: "Profession",
    width: 120,
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    width: 120,
  },
  {
    field: "number",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "mailAddress",
    headerName: "Email",
    width: 200,
  },
  {
    field: "bio",
    headerName: "Bio",
    width: 200,
  },
  {
    field: "website",
    headerName: "Website",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 150,
    valueGetter: (params) => new Date(params.row.updatedAt).toLocaleString(),
  },
  {
    field: "isVerified",
    headerName: "Verified",
    width: 90,
    type: "boolean",
    valueGetter: (params) => (params.row.isVerified ? "Yes" : "No"),
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get<User[]>('http://localhost:5000/api/users');
        const response = await axios.get<User[]>('https://devi-backend.onrender.com/api/users');
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

  const userRows = users.map((user, index) => ({
    id: `DEVIAN${index + 1}`,
    ...user,
  }));

  return (
    <div className="users">
      <div className="info">
        <h1>Buddies</h1>
        {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
