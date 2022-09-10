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

const FormCategory2 = ({
  initialValues,
  validationSchema,
  onSubmit,
  dropdownOptions,
  initUrl = null,
}) => {
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control={"select"}
                  name={"parentId"}
                  label={"Parent category"}
                  options={dropdownOptions}
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
                  name={"asset"}
                  initUrl={initUrl}
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

export default FormCategory2;
