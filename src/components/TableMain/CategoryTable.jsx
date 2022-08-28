import { Box, IconButton, Paper, TableContainer } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  selectCategoryIds,
  useGetCategoriesQuery,
} from "../../features/categorySlice";

import HeadingCrud from "../HeadingCrud";
import CustomizedMenus from "../CustomizeMenus";
const columns = [
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
    name: "Action",
    button: true,
    cell: (row) => {
      return (
        <>
          {/* <IconButton
            color="primary"
            onClick={() => {
              console.log("click updatae");
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              // openDialogHandler(true);
              console.log("click view");
            }}
          >
            <VisibilityIcon />
          </IconButton> */}
          <Box>
            <CustomizedMenus id={row.id} />
          </Box>
        </>
      );
    },
  },
];
const data = [
  {
    id: 1,
    parentCategory: {
      id: 1,
      name: "test->test1",
    },
    name: "test2",
  },
];
const CategoryTable = () => {
  const { isError, isLoading, isSuccess, error } = useGetCategoriesQuery();

  const categories = useSelector(selectAllCategories);
  if (isLoading) {
    return <p>Loading.....</p>;
  } else if (isSuccess) {
    // return JSON.stringify(categoryIds);
  } else if (isError) {
    return <p>{error}</p>;
  }
  return (
    <>
      <HeadingCrud
        label={"Category list"}
        labelBtn={"Create new +"}
        to="create"
      />
      <TableContainer component={Paper}>
        <DataTable columns={columns} data={categories} />
      </TableContainer>
    </>
  );
};

export default CategoryTable;
