import { Avatar, AvatarGroup, Box, Paper, TableContainer } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import CustomizedMenus from "../../components/CustomizeMenus";
import HeadingCrud from "../../components/HeadingCrud";
import { formatDate } from "../../utils/formatDate";
import {
  useDeleteInventoryMutation,
  useGetInventoriesQuery,
} from "../inventory/inventoryApiSlice";
import { useGetProductsQuery } from "./productApiSlice";
// import {
//   useDeleteInventoryMutation,
//   useGetInventoriesQuery,
// } from "../inventory/inventoryApiSlice";
// import { formatDate } from "../../utils/formatDate";
// import CustomizedMenus from "../CustomizeMenus";

// import HeadingCrud from "../HeadingCrud";
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
        <AvatarGroup max={3}>
          {row.productImage.map((item) => (
            <Avatar
              src={item.image.path}
              // sx={{ width: 56, height: 56 }}
            />
          ))}
        </AvatarGroup>
      );
    },
  },
  {
    name: "Product name",
    selector: (row) => row.name,
  },

  {
    name: "price",
    selector: (row) => Number(row.price).toFixed(2),
  },

  {
    name: "available stock",
    selector: (row) => row.availableStock,
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
const ProductTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteInventory] = useDeleteInventoryMutation();
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetProductsQuery(page, perPage);

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
        label={"Product list"}
        labelBtn={"Create new +"}
        to="create"
      />
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

export default ProductTable;
