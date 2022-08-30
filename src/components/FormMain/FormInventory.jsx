import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormInventory = () => {

  const initialValues = {
    categoryId: "",
    name: "",
    image: "",
    cost: 0,
    quantity: 0,
  };
  const validationSchema = Yup.object({
    
    name: Yup.string().required(),
    cost: Yup.number().min(0).required(),
    quantity: Yup.number().min(0).required(),
  });
  const onSubmit = (values) => console.log("formik values", values);
  return (
    <>
      <HeadingCrud label={"Create new product in inventory"} backTo={-1} />
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
                  control={"input"}
                  name={"name"}
                  label={"Product in inventory name"}
                  fullWidth
                />

                <FormikControl
                  control={"image"}
                  label={"upload image"}
                  name={"image"}
                />
                <FormikControl
                  control={"input"}
                  name={"cost"}
                  type="number"
                  label={"Cost price"}
                  fullWidth
                />
                <FormikControl
                  control={"input"}
                  type="number"
                  name={"quantity"}
                  label={"Quantity Stock"}
                  fullWidth
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

export default FormInventory;
