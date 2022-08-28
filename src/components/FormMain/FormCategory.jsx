import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  selectAllCategories,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/categorySlice";

import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormCategory = () => {
  const navigate = useNavigate();

  // const [createCategory] = useCreateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const { isError, isLoading, isSuccess, error } = useGetCategoriesQuery();
  const categories = useSelector(selectAllCategories);
  const dropdownOptions2 = isSuccess
    ? categories.map((category) => ({
        key: category.name,
        value: category.id,
      }))
    : [];
  dropdownOptions2.unshift({ key: "Select a option", value: "" });
  const initialValues = {
    parentId: "",
    name: "",
    // image: "",
    // allow: false,
  };

  const validationSchema = Yup.object({
    parentId: Yup.string().required(),
    name: Yup.string().required(),
    // allow: Yup.boolean(),
  });
  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      await createCategory(values).unwrap();
      navigate("/category");
    } catch (error) {
      console.error("Failed to save the post", error);
    }
  };

  return (
    <>
      <HeadingCrud label={"Create new category"} backTo={-1} />
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control={"select"}
                  name={"parentId"}
                  label={"Parent category"}
                  options={dropdownOptions2}
                />
                <FormikControl
                  control={"input"}
                  name={"name"}
                  label={"Category name"}
                  fullWidth
                />

                <FormikControl
                  control={"image"}
                  label={"upload image"}
                  name={"image"}
                />

                <FormikControl
                  control={"switch"}
                  name={"allow"}
                  label={"Allow to use in product and inventory"}
                />

                <Box m={1}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
};

export default FormCategory;
