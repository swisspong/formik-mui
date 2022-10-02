import { Box, Paper, TableContainer } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import CustomizedMenus from "../../components/CustomizeMenus";
import HeadingCrud from "../../components/HeadingCrud";
import { formatDate } from "../../utils/formatDate";
import { useDeleteOrderMutation, useGetOrdersQuery } from "./orderApiSlice";
const columns = (deleteHandler) => [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
  },
  {
    name: "#",
    selector: (row) => row.customer.firstName,
    sortable: true,
    sortField: "number",
  },
  {
    name: "total price",
    selector: (row) => `${Number(row.totalPrice).toFixed(2)}`,
    sortable: true,
    sortField: "number",
  },
  {
    name: "total quantity",
    selector: (row) => row.totalQuantity,
    sortable: true,
    sortField: "number",
  },
  {
    name: "order at",
    selector: (row) => formatDate(row.createdAt),
    sortable: true,
    sortField: "number",
  },
];
const OrderTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteInventory] = useDeleteOrderMutation();
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetOrdersQuery(page, perPage);

  const rowsPerPageHandler = (rowPerPage) => {
    setPerPage(rowPerPage);
  };
  const changePageHandler = (page) => {
    setPage(page);
  };
  if (isError) {
    return <p>{JSON.stringify(error.data.message)}</p>;
  }
  return (
    <>
      <HeadingCrud label={"Order list"} labelBtn={"Create new +"} to="create" />
      <TableContainer component={Paper}>
        <DataTable
          columns={columns(deleteInventory)}
          data={isSuccess ? products.data : []}
          progressPending={isLoading}
          onChangePage={changePageHandler}
          onChangeRowsPerPage={rowsPerPageHandler}
          pagination
          paginationServer
          paginationTotalRows={isSuccess && products.total}
        />
      </TableContainer>
    </>
  );
};

export default OrderTable;
