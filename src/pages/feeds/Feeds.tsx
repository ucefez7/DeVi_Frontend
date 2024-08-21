import { useState } from "react";
import "./Feeds.css";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

const columns: GridColDef[] = [
  {
    field: "category",
    headerName: "Category",
    width: 120,
  },
  {
    field: "subCategory",
    type: "string",
    headerName: "Sub Category",
    width: 150,
  },
  {
    field: "location",
    type: "string",
    headerName: "Location",
    width: 150,
  },
  {
    field: "platform",
    headerName: "Platform",
    type: "string",
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    type: "string",
    width: 150,
  },
  {
    field: "media",
    headerName: "Media",
    width: 150,
    // renderCell: (params) => {
    //   return <img src={params.row.img || "/noavatar.png"} alt="" />;
    // },
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 250,
  },
//   {
//     field: "action",
//     headerName: "Edit Feed",
//     width: 150,
//     renderCell: (params) => {
//       return <button>Edit</button>;
//     },
//   },
];

const Feeds = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Feeds</h1>
        {/* <button onClick={() => setOpen(true)}>Feeds</button> */}
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="post" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Feeds;
