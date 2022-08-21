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
    name: "Category",
    selector: (row) => row.name,
    sortable: true,
    sortField: "name",
  },
  {
    name: "Product name",
    selector: (row) => row.path,
    sortable: true,
    sortField: "path",
  },
  {
    name: "Cost price",
    selector: (row) => row?._count?.rolePages,
    columnName: "employee_id",
  },
  {
    name: "Quantity in stock",
    selector: (row) => row?._count?.rolePages,
    columnName: "employee_id",
  },
];
const InventoryTable = () => {
  return (
    <>
      <HeadingCrud label={"Inventory list"} labelBtn={"Create new +"} to="create"/>
      <TableContainer component={Paper}>
        <DataTable columns={columns} />
      </TableContainer>
    </>
  );
};

export default InventoryTable;
