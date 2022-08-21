import { Paper, TableContainer } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import HeadingCrud from "../HeadingCrud";
const columns = [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
  },
  {
    name: "ชื่อของหน้า",
    selector: (row) => row.name,
    sortable: true,
    sortField: "name",
  },
  {
    name: "เส้นทาง",
    selector: (row) => row.path,
    sortable: true,
    sortField: "path",
  },
  {
    name: "สิทธิการทำงาน",
    selector: (row) => row?._count?.rolePages,
    columnName: "employee_id",
  },
];
const ProductTable = () => {
  return (
    <>
      <HeadingCrud label={"Product list"} labelBtn={"Create new +"} to="create"/>
      <TableContainer component={Paper}>
        <DataTable columns={columns} />
      </TableContainer>
    </>
  );
};

export default ProductTable;
