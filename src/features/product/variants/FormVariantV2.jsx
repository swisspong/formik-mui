import { Box, Button, ButtonGroup, Grid, Paper, Stack } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../components/FormUi/FormikControl";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductVariantMutation,
} from "../productApiSlice";
import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../../utils/sweetAlertUtil";
const FormVariantV2 = () => {
  const { productId } = useParams();
  const { data: product, isSuccess } = useGetProductByIdQuery(productId);
  const [updateProductVariant] = useUpdateProductVariantMutation();
  console.log(product);

  const initialValues = {
    variants: product?.optionGroupList
      ? product.optionGroupList.map((optionGroup) => ({
          id: optionGroup.id,
          name: optionGroup.name,
          manyRelate: optionGroup.manyRelate,
        }))
      : [],
  };
  const validationSchema = Yup.object({
    // variants: Yup.array()
    //   .of(Yup.object({ name: Yup.string().required() }))
    //   .min(1),
  });

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await updateProductVariant({
        id: productId,
        initialInventory: values,
      }).unwrap();
      swalSaveSuccess();
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };
  return (
    <>
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
                  <FieldArray
                    name="variants"
                    render={(arrayHelpers) => {
                      console.log(arrayHelpers);
                      return (
                        <div>
                          {formik.values.variants &&
                            formik.values.variants.map((option, index) => (
                              <div key={index}>
                                <Box display={"flex"} alignItems={"center"}>
                                  <Box
                                    mx={1}
                                    my={2}
                                    p={2}
                                    flexGrow={1}
                                    border={1}
                                    borderRadius={1}
                                    borderColor={"grey.500"}
                                    display={"flex"}
                                    flexDirection={"column"}
                                  >
                                    <Box
                                      display={"flex"}
                                      flexGrow={1}
                                      alignItems={"center"}
                                    >
                                      <Box flexGrow={1}>
                                        <FormikControl
                                          control={"switch"}
                                          name={`variants.${index}.manyRelate`}
                                          index={index}
                                          //   changeHandler={switchManyRelateHandler}
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
                                      </Box>

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
                                              formik.values.variants.length - 1
                                            }
                                          >
                                            <MoveDownIcon />
                                          </Button>
                                        </ButtonGroup>
                                      </Box>
                                    </Box>
                                    <Box ml={1}>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        component={Link}
                                        to={`${formik.values.variants[index]?.id}/options`}
                                        disabled={
                                          !formik.values.variants[index]?.id
                                        }
                                      >
                                        Manage Options
                                      </Button>
                                    </Box>
                                  </Box>
                                  <Button
                                    variant="outlined"
                                    color={"error"}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Box>
                              </div>
                            ))}
                          <Box>
                            <Button
                              sx={{ ml: 1 }}
                              type="button"
                              variant="contained"
                              onClick={() =>
                                arrayHelpers.push({
                                  id: null,
                                  manyRelate: false,
                                  name: "",
                                  defaultOption: "",
                                })
                              }
                            >
                              Add a Variant
                            </Button>
                          </Box>
                        </div>
                      );
                    }}
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

export default FormVariantV2;
