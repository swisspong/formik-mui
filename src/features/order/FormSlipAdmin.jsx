import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../components/FormUi/FormikControl";

const FormSlipAdmin = ({
  initialValues,
  validationSchema,
  onSubmit,

  handleClose,
  data = null,
  initUrl = null,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form
            style={{
              width: "100%",
            }}
          >
            <FormikControl
              control={"image"}
              label={"upload image"}
              name={"asset"}
              initUrl={initUrl}
            />

          
            <Box m={1}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormSlipAdmin;
