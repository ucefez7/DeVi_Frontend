import { useState } from "react";
import "./authentication.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
//import { products } from "../../data";
import { authentication } from "../../data";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "User ID",
    width: 90,
  },
  {
    field: "pageName",
    headerName: "Page Name",
    type: "string",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    width: 120,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    type: "string",
    width: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "string",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 250,
  },
  {
    field: "link",
    headerName: "Link",
    type: "string",
    width: 200,
  },
  {
    field: "signedIn",
    headerName: "Signed In",
    type: "boolean",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Requested At",
    type: "string",
    width: 120,
  },
];

const Authentication = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="authentication">
      <div className="info">
        <h1>User Authentication</h1>
      </div>
      <DataTable slug="authentication" columns={columns} rows={authentication} />
      {open && <Add slug="authentication" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Authentication;
