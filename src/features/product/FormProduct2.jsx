import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../components/FormUi/FormikControl";
import { useGetCategoriesQuery } from "../categorySlice";
import { useGetInventoriesQuery } from "../inventory/inventoryApiSlice";

const FormProduct2 = ({
  initialValues,
  validationSchema,
  onSubmit,
  edit = false,
}) => {
  const { data: categories, isSuccess } = useGetCategoriesQuery(1, 200);
  const { data: inventories, isSuccess: isSuccessInventories } =
    useGetInventoriesQuery(1, 200);

  const categoryOptions = isSuccess
    ? categories.data.map((category) => ({
        key: category.breadcrumbs + " => " + category.name,
        value: category.id,
      }))
    : [];
  categoryOptions.unshift({ key: "Select a option", value: "" });

  const inventoryOptions = isSuccessInventories
    ? inventories.data.map((inventory) => ({
        key: inventory.name,
        value: inventory.id,
      }))
    : [];
  inventoryOptions.unshift({ key: "Select a option", value: "" });


  return (
    <>
      {isSuccess && isSuccessInventories && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                  <FormikControl
                    control={"select"}
                    name={"categoryId"}
                    label={"Select category"}
                    options={categoryOptions}
                  />
                  <FormikControl
                    control={"select"}
                    name={"inventoryId"}
                    label={"Select a product from inventory"}
                    options={inventoryOptions}
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
                  <FormikControl
                    control={"image"}
                    label={"upload image(s)"}
                    name={"file"}
                    multiple
                  />
                </Paper>
                <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Typography variant="h6">Variant</Typography>
                    <Button
                      to={"variants"}
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
      )}
    </>
  );
};

export default FormProduct2;
