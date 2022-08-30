import { Box, IconButton, Paper, TableContainer } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/categorySlice";

import HeadingCrud from "../HeadingCrud";
import CustomizedMenus from "../CustomizeMenus";
import { formatDate } from "../../utils/formatDate";
const columns = (deleteHandler) => [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
  },
  {
    name: "parent category",
    selector: (row) => row.breadcrumbs,
  },
  {
    name: "category name",
    selector: (row) => row.name,
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
              id={row.id}
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

const CategoryTable = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteCategory] = useDeleteCategoryMutation();
  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCategoriesQuery(page, perPage);
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
        label={"Category list"}
        labelBtn={"Create new +"}
        to="create"
      />
      <TableContainer component={Paper}>
        <DataTable
          columns={columns(deleteCategory)}
          data={isSuccess ? categories.data : []}
          progressPending={isLoading}
          onChangePage={changePageHandler}
          onChangeRowsPerPage={rowsPerPageHandler}
          pagination
          paginationServer
          paginationTotalRows={isSuccess && categories.total}
        />
      </TableContainer>
    </>
  );
};

export default CategoryTable;
