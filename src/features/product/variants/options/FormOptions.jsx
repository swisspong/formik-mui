import { Box, Button, ButtonGroup, Grid, Paper } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../../components/FormUi/FormikControl";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetInventoriesQuery } from "../../../inventory/inventoryApiSlice";

const FormOptions = ({ initialValues, onSubmit, validationSchema }) => {
  // const dropdownOptions = [
  //   { key: "Select a option", value: "" },
  //   { key: "Option 1", value: 1 },
  //   { key: "Option 2", value: 2 },
  //   { key: "Option 3", value: 3 },
  // ];
  const switchManyRelateHandler = (setValues, values, index) => {
    setValues(() => {
      const options = values.options;

      const tmpObj = {
        ...values,
        manyRelate: !values.manyRelate,
        options: options.map((option) => ({
          ...(!values?.manyRelate
            ? { name: option.name, price: option.price, inventoryIdList: [] }
            : { name: option.name, price: option.price, inventoryId: "" }),
        })),
      };
      return tmpObj;
    });
  };
  const switchShowImageHandler = (setValues, values, index) => {
    setValues(() => {
      let tmpObj = values;
      tmpObj.showImage = !tmpObj.showImage;
      if (tmpObj.showImage) {
        tmpObj.inventoryImage = false;
        tmpObj.options = tmpObj.options.map((option) => ({
          ...option,
          asset: "",
        }));
      } else {
        delete tmpObj.inventoryImage;
        tmpObj.options.forEach((option) => {
          delete option.asset;
        });
      }
      return tmpObj;
    });
  };
  const switchInventoryImageHandler = (setValues, values, index) => {
    setValues(() => {
      let tmpObj = values;
      tmpObj.inventoryImage = !tmpObj.inventoryImage;
      if (tmpObj.inventoryImage) {
        tmpObj.options.forEach((option) => {
          delete option.asset;
        });
      } else {
        tmpObj.options = tmpObj.options.map((option) => ({
          ...option,
          asset: "",
        }));
      }
      return tmpObj;
    });
  };

  const { data: inventories, isSuccess } = useGetInventoriesQuery(1, 200);

  const dropdownOptions = isSuccess
    ? inventories.data.map((inventory) => ({
        key: inventory.name,
        value: inventory.id,
      }))
    : [];
  dropdownOptions.unshift({ key: "Select a option", value: "" });
  // const initialValues = {
  //   manyRelate: false,
  //   showImage: false,
  //   options: [
  //     {
  //       name: "",
  //       price: 0,
  //       inventoryId: "",
  //     },
  //   ],
  // };
  // const validationSchema = Yup.object({
  //   // variants: Yup.array()
  //   //   .of(Yup.object({ name: Yup.string().required() }))
  //   //   .min(1),
  // });
  // const onSubmit = (values) => console.log("formik values", values);
  return (
    <>
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                  <FormikControl
                    control={"switch"}
                    name={`manyRelate`}
                    changeHandler={switchManyRelateHandler}
                    label={"Many Relate"}
                  />

                  <FormikControl
                    control={"switch"}
                    name={`showImage`}
                    changeHandler={switchShowImageHandler}
                    label={"Show Image"}
                  />
                  {formik.values.showImage && (
                    <FormikControl
                      control={"switch"}
                      name={`inventoryImage`}
                      label={"Inventory image"}
                      changeHandler={switchInventoryImageHandler}
                    />
                  )}

                  <FieldArray
                    name="variants"
                    render={(arrayHelpers) => (
                      <div>
                        {
                          <div>
                            <FieldArray
                              name={`options`}
                              render={(arrayHelpers) => (
                                <div>
                                  {formik.values.options &&
                                    formik.values.options.map(
                                      (option, index) => (
                                        <Box
                                          display={"flex"}
                                          alignItems="center"
                                        >
                                          <Box
                                            mx={1}
                                            my={2}
                                            p={2}
                                            border={1}
                                            borderRadius={1}
                                            borderColor={"grey.500"}
                                            display={"flex"}
                                            alignItems={"center"}
                                            flexGrow={1}
                                          >
                                            <Grid container spacing={0}>
                                              <Grid item xs={4}>
                                                <FormikControl
                                                  control={"input"}
                                                  name={`options.${index}.name`}
                                                  label={`Option name ${
                                                    index + 1
                                                  }`}
                                                  fullWidth
                                                />
                                              </Grid>
                                              <Grid item xs={2}>
                                                <FormikControl
                                                  control={"input"}
                                                  name={`options.${index}.price`}
                                                  label={`Price`}
                                                  type="number"
                                                  fullWidth
                                                />
                                              </Grid>
                                              <Grid item xs={6}>
                                                {formik.values.manyRelate ? (
                                                  <FormikControl
                                                    control={"multipleSelect"}
                                                    name={`options.${index}.inventoryIdList`}
                                                    label={
                                                      "Select many product from inventory"
                                                    }
                                                    labelId={
                                                      "inventory-list-label"
                                                    }
                                                    options={dropdownOptions}
                                                  />
                                                ) : (
                                                  <FormikControl
                                                    control={"select"}
                                                    name={`options.${index}.inventoryId`}
                                                    label={
                                                      "Select a product from inventory"
                                                    }
                                                    options={dropdownOptions}
                                                  />
                                                )}
                                              </Grid>
                                              {formik.values.showImage &&
                                                !formik.values
                                                  .inventoryImage && (
                                                  <Grid item xs={12}>
                                                    <FormikControl
                                                      control={"image"}
                                                      label={"upload image"}
                                                      name={`options.${index}.asset`}
                                                      // initUrl={initUrl}
                                                    />
                                                  </Grid>
                                                )}
                                            </Grid>

                                            <Box ml={1}>
                                              <ButtonGroup
                                                orientation="vertical"
                                                aria-label="vertical outlined button group"
                                              >
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.move(
                                                      index,
                                                      index - 1
                                                    )
                                                  }
                                                  disabled={index <= 0}
                                                >
                                                  <MoveUpIcon />
                                                </Button>
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.move(
                                                      index,
                                                      index + 1
                                                    )
                                                  }
                                                  disabled={
                                                    index >=
                                                    formik.values.options
                                                      .length -
                                                      1
                                                  }
                                                >
                                                  <MoveDownIcon />
                                                </Button>
                                              </ButtonGroup>
                                            </Box>
                                          </Box>
                                          <Box>
                                            <Button
                                              variant="outlined"
                                              color={"error"}
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Box>
                                        </Box>
                                      )
                                    )}
                                  <Button
                                    sx={{ ml: 1, mb: 1 }}
                                    type="button"
                                    variant="contained"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        name: "",
                                        price: 0,
                                        ...(formik.values.manyRelate
                                          ? { inventoryIdList: [] }
                                          : { inventoryId: "" }),
                                      })
                                    }
                                  >
                                    Add a Option
                                  </Button>
                                </div>
                              )}
                            />
                          </div>
                        }
                      </div>
                    )}
                  />
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

export default FormOptions;
