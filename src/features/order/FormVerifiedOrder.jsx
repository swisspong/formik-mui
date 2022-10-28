import { Box, Button, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../components/FormUi/FormikControl";

const FormVerifiedOrder = ({
  initialValues,
  validationSchema,
  onSubmit,
  dropdownOptions,
  handleClose,
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
                control={"select"}
                name={"status"}
                label={"Status"}
                options={dropdownOptions}
           
              />
              <FormikControl
                control={"input"}
                name={"referId"}
                label={"Refer Id"}
                fullWidth
              />
              <FormikControl
                control={"input"}
                name={"price"}
                type={"number"}
                label={"Price"}
                fullWidth
              />

              {/* <FormikControl
              control={"switch"}
              name={"allow"}
              label={"Allow to use in product and inventory"}
            /> */}

              <Box m={1}sx={{ display: "flex",justifyContent:"end", gap: "10px" }} >
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    
  );
};

export default FormVerifiedOrder;
