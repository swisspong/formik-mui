import { Avatar, Box, Paper, TableContainer } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useDeleteInventoryMutation,
  useGetInventoriesQuery,
} from "../../features/inventory/inventoryApiSlice";
import { formatDate } from "../../utils/formatDate";
import CustomizedMenus from "../CustomizeMenus";

import HeadingCrud from "../HeadingCrud";
const columns = (deleteHandler) => [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
  },
  {
    name: "image",
    cell: (row) => {
      return (
        <Avatar
          variant="square"
          src={row.image.path}
          sx={{ width: 56, height: 56 }}
        />
      );
    },
  },
  {
    name: "inventory name",
    selector: (row) => row.name,
  },

  {
    name: "cost price",
    selector: (row) => Number(row.costPrice).toFixed(2),
  },

  {
    name: "Quantity in Stock",
    selector: (row) => row.quantity,
  },
  {
    name: "created at",
    selector: (row) => formatDate(row.createdAt),
  },
  {
    name: "updated at",
    selector: (row) => formatDate(row.updatedAt),
  },
  {
    name: "Action",
    button: true,
    cell: (row) => {
      return (
        <>
          <Box>
            <CustomizedMenus
              editPath={`edit/${row.id}`}
              viewPath={`view/${row.id}`}
              deleteHandler={() => deleteHandler({ id: row.id })}
            />
          </Box>
        </>
      );
    },
  },
];
const InventoryTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteInventory] = useDeleteInventoryMutation();
  const {
    data: inventories,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetInventoriesQuery(page, perPage);
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
      <HeadingCrud
        label={"Inventory list"}
        labelBtn={"Create new +"}
        to="create"
      />
      <TableContainer component={Paper}>
        <DataTable
          columns={columns(deleteInventory)}
          data={isSuccess ? inventories.data : []}
          progressPending={isLoading}
          onChangePage={changePageHandler}
          onChangeRowsPerPage={rowsPerPageHandler}
          pagination
          paginationServer
          paginationTotalRows={isSuccess && inventories.total}
        />
      </TableContainer>
    </>
  );
};

export default InventoryTable;
