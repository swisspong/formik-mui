import { Paper } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import HeadingCrud from "../../components/HeadingCrud";
import Section from "../../components/Section";
import { formatDate } from "../../utils/formatDate";

import {
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
} from "../categorySlice";

const ViewCategory = () => {
  const { categoryId } = useParams();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: category, isSuccess } = useGetCategoryByIdQuery(categoryId);

  return (
    <>
      <HeadingCrud
        label={"View category"}
        backTo={-1}
        editPath={`/category/edit/${categoryId}`}
        deleteHandler={() => deleteCategory({ id: categoryId })}
      />
      {isSuccess && (
        <Paper sx={{ p: 4 }}>
          <Section label={"ID"} info={category?.id} />
          <Section label={"Parent category"} info={category?.breadcrumbs} />
          <Section label={"Category name"} info={category?.name} />
          <Section
            label={"created at"}
            info={formatDate(category?.updatedAt)}
          />
          <Section
            label={"updated at"}
            info={formatDate(category?.createdAt)}
          />
        </Paper>
      )}
    </>
  );
};

export default ViewCategory;
