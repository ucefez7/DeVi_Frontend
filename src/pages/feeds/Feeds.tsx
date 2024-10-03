import { useState } from "react";
import "./Feeds.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

const columns: GridColDef[] = [
  {
    field: "categories",
    headerName: "Category",
    width: 120,
  },
  {
    field: "subCategories",
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
    field: "usernameOrName",
    headerName: "Username",
    type: "string",
    width: 150,
  },
  {
    field: "mediaUrl",
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

];

const Feeds = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="products">
      <div className="info">
        <h1>Feeds</h1>
        <button onClick={() => setOpen(true)}>Feeds</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="post" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Feeds;
