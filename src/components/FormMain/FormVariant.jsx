import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,

} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormVariant = () => {
  const dropdownOptions = [
    { key: "Select a option", value: "" },
    { key: "Option 1", value: 1 },
    { key: "Option 2", value: 2 },
    { key: "Option 3", value: 3 },
  ];
  const switchManyRelateHandler = (setValues, values, index) => {
    setValues(() => {
      const variant = values.variants;
      variant[index] = {
        manyRelate: !variant[index].manyRelate,
        name: variant[index].name,
        defaultOption: variant[index].defaultOption,
        options: variant[index].options.map((option) => ({
          ...(!variant[index].manyRelate
            ? { name: option.name, price: option.price, inventoryList: [] }
            : { name: option.name, price: option.price, inventoryId: "" }),
        })),
      };

      const tmpObj = {
        ...values,
        variants: variant,
      };

      return tmpObj;
    });
  };
  const initialValues = {
    variants: [],
  };
  const validationSchema = Yup.object({
    // variants: Yup.array()
    //   .of(Yup.object({ name: Yup.string().required() }))
    //   .min(1),
  });
  const onSubmit = (values) => console.log("formik values", values);
  return (
    <>
      <HeadingCrud label={"Manage variants"} backTo={-1} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                <FieldArray
                  name="variants"
                  render={(arrayHelpers) => (
                    <div>
                      {formik.values.variants &&
                      formik.values.variants.length > 0 ? (
                        formik.values.variants.map((option, index) => (
                          <div key={index}>
                            <Box
                              mx={1}
                              my={2}
                              p={2}
                              border={1}
                              borderRadius={1}
                              borderColor={"grey.500"}
                            >
                              <FormikControl
                                control={"switch"}
                                name={`variants.${index}.manyRelate`}
                                index={index}
                                changeHandler={switchManyRelateHandler}
                                label={"Many Relate"}
                              />

                              <FormikControl
                                control={"switch"}
                                name={`variants.${index}.showImage`}
                                label={"Show Image"}
                              />

                              <FormikControl
                                control={"input"}
                                name={`variants.${index}.name`}
                                label={`Name of variant ${index + 1}`}
                                fullWidth
                              />

                              <FieldArray
                                name={`variants.${index}.options`}
                                render={(arrayHelpers) => (
                                  <div>
                                    {formik.values.variants[index].options &&
                                    formik.values.variants[index].options
                                      .length > 0 ? (
                                      formik.values.variants[index].options.map(
                                        (option, index2) => (
                                          <Box
                                            mx={1}
                                            my={2}
                                            p={2}
                                            border={1}
                                            borderRadius={1}
                                            borderColor={"grey.500"}
                                          >
                                            <Grid container spacing={0}>
                                              <Grid item xs={6}>
                                                <FormikControl
                                                  control={"input"}
                                                  name={`variants.${index}.options.${index2}.name`}
                                                  label={`Option name ${
                                                    index2 + 1
                                                  }`}
                                                  fullWidth
                                                />
                                              </Grid>
                                              <Grid item xs={6}>
                                                <FormikControl
                                                  control={"input"}
                                                  name={`variants.${index}.options.${index2}.price`}
                                                  label={`Option name ${
                                                    index2 + 1
                                                  }`}
                                                  type="number"
                                                  fullWidth
                                                />
                                              </Grid>
                                              <Grid item xs={12}>
                                                {formik.values.variants[index]
                                                  .manyRelate ? (
                                                  <FormikControl
                                                    control={"multipleSelect"}
                                                    name={`variants.${index}.options.${index2}.inventoryList`}
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
                                                    name={`variants.${index}.options.${index2}.inventoryId`}
                                                    label={
                                                      "Select a product from inventory"
                                                    }
                                                    options={dropdownOptions}
                                                  />
                                                )}
                                              </Grid>
                                            </Grid>

                                            <Box ml={1}>
                                              <ButtonGroup variant="contained">
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.remove(index2)
                                                  }
                                                  disabled={
                                                    formik.values.variants[
                                                      index
                                                    ].options.length <= 1
                                                  }
                                                >
                                                  -
                                                </Button>
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.insert(
                                                      index2,
                                                      {
                                                        name: "",
                                                        price: 0,
                                                        ...(formik.values
                                                          .variants[index]
                                                          .manyRelate
                                                          ? {
                                                              inventoryList: [],
                                                            }
                                                          : {
                                                              inventoryId: "",
                                                            }),
                                                      }
                                                    )
                                                  }
                                                >
                                                  +
                                                </Button>
                                              </ButtonGroup>
                                            </Box>
                                          </Box>
                                        )
                                      )
                                    ) : (
                                      <Button
                                        sx={{ ml: 1, mb: 1 }}
                                        type="button"
                                        variant="contained"
                                        onClick={() =>
                                          arrayHelpers.push({
                                            name: "",
                                            price: 0,
                                            ...(formik.values.variants[index]
                                              .manyRelate
                                              ? { inventoryList: [] }
                                              : { inventoryId: "" }),
                                          })
                                        }
                                      >
                                        Add a Option
                                      </Button>
                                    )}
                                  </div>
                                )}
                              />

                              <Box ml={1}>
                                <ButtonGroup variant="contained">
                                  <Button
                                    onClick={() => arrayHelpers.remove(index)}
                                    disabled={
                                      formik.values.variants.length <= 1
                                    }
                                  >
                                    -
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        manyRelate: false,
                                        name: "",
                                        defaultOption: "",
                                        options: [
                                          {
                                            name: "",
                                            price: 0,
                                            inventoryId: "",
                                          },
                                        ],
                                      })
                                    }
                                  >
                                    +
                                  </Button>
                                </ButtonGroup>
                              </Box>
                            </Box>
                          </div>
                        ))
                      ) : (
                        <Button
                          sx={{ ml: 1 }}
                          type="button"
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({
                              manyRelate: false,
                              name: "",
                              defaultOption: "",
                              options: [
                                { name: "", price: 0, inventoryId: "" },
                              ],
                            })
                          }
                        >
                          Add a Variant
                        </Button>
                      )}
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
    </>
  );
};

export default FormVariant;
