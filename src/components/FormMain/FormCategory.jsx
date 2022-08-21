import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormCategory = () => {
  const dropdownOptions = [
    { key: "Select a option", value: "" },
    { key: "Option 1", value: 1 },
    { key: "Option 2", value: 2 },
    { key: "Option 3", value: 3 },
  ];
  const initialValues = {
    parentId: "",
    name: "",
    image: "",
    allow: false,
  };
  const validationSchema = Yup.object({
    parentId: Yup.string().required(),
    name: Yup.string().required(),
    allow: Yup.boolean(),
  });
  const onSubmit = (values) => console.log("formik values", values);
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
