import { Paper, TableContainer } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  selectCategoryIds,
  useGetCategoriesQuery,
} from "../../features/categorySlice";

import HeadingCrud from "../HeadingCrud";
const columns = [
  {
    name: "#",
    selector: (row) => row.id,
    sortable: true,
    sortField: "id",
  },
  {
    name: "parent category",
    selector: (row) => row.parentCategory.name,
    sortable: true,
    sortField: "name",
  },
  {
    name: "category name",
    selector: (row) => row.name,
    sortable: true,
    sortField: "path",
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

  const categoryIds = useSelector(selectAllCategories);
  if (isLoading) {
    return <p>Loading.....</p>;
  } else if (isSuccess) {
    return JSON.stringify(categoryIds);
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
      <TableContainer component={Paper} elevation={0}>
        <DataTable columns={columns} data={data} />
      </TableContainer>
    </>
  );
};

export default CategoryTable;
