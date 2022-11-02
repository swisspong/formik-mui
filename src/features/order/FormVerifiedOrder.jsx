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

  handleClose,
  data = null,
  initUrl = null,
}) => {
  const switchInvalidSlipHandler = (setValues, values, index) => {
    setValues(() => {
      const newInvalidSlip = !values.invalidSlip;
      const tmpObj = {
        invalidSlip: newInvalidSlip,
        ...(newInvalidSlip
          ? { message: "" }
          : { referId: data?.referId || "", price: data?.price || "" }),
      };

      return tmpObj;
    });
  };

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
              control={"switch"}
              name={`invalidSlip`}
              changeHandler={switchInvalidSlipHandler}
              label={"Invalid Slip"}
            />
            {formik.values.invalidSlip ? (
              <FormikControl
                control={"input"}
                name={"message"}
                label={"Message to client"}
                fullWidth
              />
            ) : (
              <>
                {" "}
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
              </>
            )}

            <Box
              m={1}
              sx={{ display: "flex", justifyContent: "end", gap: "10px" }}
            >
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
