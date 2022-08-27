import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../FormUi/FormikControl";
import HeadingCrud from "../HeadingCrud";

const FormProduct = () => {
  const dropdownOptions = [
    { key: "Select a option", value: "" },
    { key: "Option 1", value: 1 },
    { key: "Option 2", value: 2 },
    { key: "Option 3", value: 3 },
  ];
  const switchOptionHandler = (setValues, values) => {
    setValues(() => {
      const tmpObj = {
        ...values,
        option: !values.option,
        ...(!values.option === true
          ? {
              optionList: [
                {
                  manyRelate: false,
                  showImage: false,
                  name: "",
                  itemList: [{ id: 0, name: "" }],
                },
              ],
            }
          : { inventoryId: "" }),
      };
      if (tmpObj.option) {
        delete tmpObj.inventoryId;
      } else {
        delete tmpObj.optionList;
      }
      return tmpObj;
    });
  };
  const initialValues = {
    name: "",
    availableStock: 1,
    description: "",
    images: [],
    option: false,
    inventoryId: "",
    file: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    availableStock: Yup.number().min(1),
    description: Yup.string().required(),
    // inventoryId: Yup.string().required(),
    option: Yup.boolean(),
    inventoryId: Yup.string().when("option", {
      is: false,
      then: Yup.string().required(),
    }),
    optionList: Yup.array()
      .of(Yup.object({ name: Yup.string().required() }))
      .min(1),
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
              <Paper sx={{ p: 2,mb:3 }} elevation={3}>
                <FormikControl
                  control={"input"}
                  name={"name"}
                  label={"Name of product"}
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
                  name={"description"}
                  label={"Description"}
                  fullWidth
                  multiline
                  rows={4}

                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">฿</InputAdornment>
                  //   ),
                  // }}
                />
                <FormikControl
                  control={"image"}
                  label={"upload image(s)"}
                  name={"file"}
                  multiple
                />
                {/* <ImageWrapper label={"upload image(s)"} name={"file"} multiple /> */}
                <FormikControl
                  control={"switch"}
                  name={"option"}
                  label={"option"}
                  changeHandler={switchOptionHandler}
                />
                <FormikControl
                  control={"switch"}
                  name={"option"}
                  label={"Relate with Inventory"}
                  changeHandler={switchOptionHandler}
                />

                {formik.values.option ? (
                  <Box
                    mx={1}
                    my={2}
                    p={2}
                    border={1}
                    borderRadius={1}
                    borderColor={"grey.500"}
                  >
                    <FieldArray
                      name="optionList"
                      render={(arrayHelpers) => (
                        <div>
                          {formik.values.optionList &&
                          formik.values.optionList.length > 0 ? (
                            formik.values.optionList.map((option, index) => (
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
                                    name={`optionList.${index}.manyRelate`}
                                    label={"Many Relate"}
                                  />

                                  <FormikControl
                                    control={"switch"}
                                    name={`optionList.${index}.showImage`}
                                    label={"Show Image"}
                                  />
                                  <FormikControl
                                    control={"input"}
                                    name={`optionList.${index}.name`}
                                    label={`Name of option ${index + 1}`}
                                    fullWidth
                                  />

                                  <Box m={2} p={2} border={1}></Box>

                                  <Box ml={1}>
                                    <ButtonGroup variant="contained">
                                      <Button
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        disabled={
                                          formik.values.optionList.length <= 1
                                        }
                                      >
                                        -
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          arrayHelpers.insert(index, {
                                            name: "",
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
                              type="button"
                              variant="contained"
                              onClick={() => arrayHelpers.push({ name: "" })}
                            >
                              Add a Option Group
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </Box>
                ) : (
                  <FormikControl
                    control={"select"}
                    name={"inventoryId"}
                    label={"Select a topic"}
                    options={dropdownOptions}
                  />
                )}
              </Paper>
              <Paper sx={{ p: 2,mb:3 }} elevation={3}>
                
              </Paper>
              <Paper sx={{ p: 2,mb:3 }} elevation={3}>
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

export default FormProduct;
