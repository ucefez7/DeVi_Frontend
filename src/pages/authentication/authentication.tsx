import { useState } from "react";
import "./authentication.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
//import { products } from "../../data";
import { authentication } from "../../data";

const columns: GridColDef[] = [
  //{ field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Image",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
  {
    field: "title",
    type: "string",
    headerName: "Phone Number",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "color",
    type: "string",
    headerName: "Signed In",
    width: 150,
  },

  { field: "id", headerName: "USER ID", width: 90 },

  {
    field: "inStock",
    headerName: "Block",
    width: 150,
    type: "boolean",
  },
];

const Authentication = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="products">
      <div className="info">
        <h1>User Authentication</h1>
        {/* <button onClick={() => setOpen(true)}>Edit Posts</button> */}
      </div>
      <DataTable slug="products" columns={columns} rows={authentication} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="post" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Authentication;
