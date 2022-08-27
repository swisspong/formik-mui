import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormProduct2 = ({ edit = false }) => {
  const dropdownOptions = [
    { key: "Select a option", value: "" },
    { key: "Option 1", value: 1 },
    { key: "Option 2", value: 2 },
    { key: "Option 3", value: 3 },
  ];

  const initialValues = {
    categoryId: "",
    inventoryId: "",
    name: "",
    availableStock: 0,
    price: 0.0,
    description: "",
  };
  const validationSchema = Yup.object({
    categoryId: Yup.string().required(),
    inventoryId: Yup.string().required(),
    name: Yup.string().required(),
    availableStock: Yup.number().integer().min(0).required(),
    price: Yup.number().min(0).required(),
    description: Yup.string().required(),
  });
  const onSubmit = (values) => console.log("formik values", values);
  return (
    <>
      <HeadingCrud label={"Create new product"} backTo={-1} />
      {/* <Paper sx={{ p: 2 }} elevation={3}> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log(formik.values);

          return (
            <Form>
              <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                <FormikControl
                  control={"select"}
                  name={"categoryId"}
                  label={"Select category"}
                  options={dropdownOptions}
                />
                <FormikControl
                  control={"select"}
                  name={"inventoryId"}
                  label={"Select a product from inventory"}
                  options={dropdownOptions}
                />
                <FormikControl
                  control={"input"}
                  name={"name"}
                  label={"Product name"}
                  fullWidth
                />
                <FormikControl
                  control={"input"}
                  name={"availableStock"}
                  label={"Available Stock"}
                  type={"number"}
                  fullWidth
                />
                <FormikControl
                  control={"input"}
                  name={"price"}
                  label={"Price"}
                  type={"number"}
                  fullWidth
                />
                <FormikControl
                  control={"input"}
                  name={"description"}
                  label={"Description"}
                  fullWidth
                  multiline
                  rows={4}
                />
                {/* <FormikControl
                  control={"image"}
                  label={"upload image(s)"}
                  name={"file"}
                  multiple
                /> */}
              </Paper>
              <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Typography variant="h6">Variant</Typography>
                  <Button
                    to={"variant"}
                    component={Link}
                    disabled={!edit}
                    variant="contained"
                  >
                    manage
                  </Button>
                </Box>
              </Paper>
              <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                <Box m={1}>
                  <Button fullWidth type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Form>
          );
        }}
      </Formik>
      {/* </Paper> */}
    </>
  );
};

export default FormProduct2;
