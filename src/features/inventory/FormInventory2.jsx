import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import FormikControl from "../../components/FormUi/FormikControl";

const FormInventory2 = ({
  initialValues,
  validationSchema,
  onSubmit,
  initUrl = null,
}) => {
  return (
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
              <FormikControl
                control={"image"}
                label={"upload image"}
                name={"asset"}
                initUrl={initUrl}
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
  );
};

export default FormInventory2;
