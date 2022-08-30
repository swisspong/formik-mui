import { Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeadingCrud from "../../components/HeadingCrud";
import Section from "../../components/Section";
import { formatDate } from "../../utils/formatDate";
import { selectCategoryById, useGetCategoryByIdQuery } from "../categorySlice";

const ViewCategory = () => {
  const { categoryId } = useParams();
  const { data: category, isSuccess } = useGetCategoryByIdQuery(categoryId);
  console.log(category);
  return (
    <>
      <HeadingCrud label={"View category"} backTo={-1} />
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
