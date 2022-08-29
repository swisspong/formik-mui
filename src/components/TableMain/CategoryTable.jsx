import { Box, IconButton, Paper, TableContainer } from "@mui/material";
import React, { useState } from "react";
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

const CategoryTable = () => {
  const { perPage, setPerPage } = useState(10);
  const [page, setPage] = useState(1);
  const { isError, isLoading, isSuccess, error } = useGetCategoriesQuery();
  const rowsPerPageHandler = (rowPerPage) => {
    setPerPage(rowPerPage);
  };
  const changePageHandler = (page) => {
    setPage(page);
  };
  const categories = useSelector(selectAllCategories);
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
          columns={columns}
          data={categories.data}
          progressPending={isLoading}
          onChangePage={changePageHandler}
          onChangeRowsPerPage={rowsPerPageHandler}
          pagination
          paginationServer
          paginationTotalRows={10}
        />
      </TableContainer>
    </>
  );
};

export default CategoryTable;
