import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik, getIn } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../../components/FormUi/FormikControl";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetInventoriesQuery } from "../../../inventory/inventoryApiSlice";
import PreviewImage from "../../../../components/FormUi/PreviewImage";
import { useGetOptionListByProductIdAndOptionGroupIdQuery } from "./optionApiSlice";
import { useParams } from "react-router-dom";

const FormOptions = ({ initialValues, onSubmit, validationSchema }) => {
  // const dropdownOptions = [
  //   { key: "Select a option", value: "" },
  //   { key: "Option 1", value: 1 },
  //   { key: "Option 2", value: 2 },
  //   { key: "Option 3", value: 3 },
  // ];
  const { productId, optionGroupId } = useParams();
  const {
    data: optionGroup,
    isLoading,
    isSuccess: isSuccessOption,
  } = useGetOptionListByProductIdAndOptionGroupIdQuery({
    productId,
    optionGroupId,
  });
  const switchManyRelateHandler = (setValues, values, index) => {
    setValues(() => {
      const options = values.options;

      const tmpObj = {
        ...values,
        manyRelate: !values.manyRelate,
        options: options.map((option) => ({
          ...(!values?.manyRelate
            ? {
                name: option.name,
                price: option.price,
                inventoryIdList: [],
                ...(values.showImage && { asset: "" }),
              }
            : {
                name: option.name,
                price: option.price,
                inventoryId: "",
                ...(values.showImage && { asset: "" }),
              }),
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
        tmpObj.options = tmpObj.options.map((option) => ({
          ...option,
          asset: "",
        }));
      } else {
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
  console.log(inventories);
  const dropdownOptions = isSuccess
    ? inventories.data.map((inventory) => ({
        key: inventory.name,
        value: inventory.id,
      }))
    : [];
  dropdownOptions.unshift({ key: "Select a option", value: "" });

  const customOnChangeSelectHandler = (name, setFieldValue, values, value) => {
    const nameSplit = name.split(".");
    const index = Number(nameSplit[1]);
    const nameOfImage = `options.${index}.asset`;
    const assetValue = getIn(values, nameOfImage);
    if (!isNaN(assetValue) && assetValue > 0) {
    } else {
      const image = inventories.data.find(
        (inventory) => inventory.id === value
      ).image;
      console.log(image);
      setFieldValue(nameOfImage, { id: image.id, path: image.path });
    }
  };
  const customOnChangeSelectMultipleHandler = (
    name,
    setFieldValue,
    values,
    value
  ) => {
    const nameSplit = name.split(".");
    const index = Number(nameSplit[1]);
    const nameOfImage = `options.${index}.asset`;
    const assetValue = getIn(values, nameOfImage);
    if (!isNaN(assetValue) && assetValue > 0) {
    } else {
      const image = inventories.data.find(
        (inventory) => inventory.id === value[0]
      ).image;
      console.log(image);
      setFieldValue(nameOfImage, { id: image.id, path: image.path });
    }
  };
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
                  {/* {formik.values.showImage && (
                    <FormikControl
                      control={"switch"}
                      name={`inventoryImage`}
                      label={"Inventory image"}
                      changeHandler={switchInventoryImageHandler}
                    />
                  )} */}
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
                                                    // changeHandler={
                                                    //   customOnChangeSelectMultipleHandler
                                                    // }
                                                    options={dropdownOptions}
                                                  />
                                                ) : (
                                                  <FormikControl
                                                    control={"select"}
                                                    name={`options.${index}.inventoryId`}
                                                    label={
                                                      "Select a product from inventory"
                                                    }
                                                    changeHandler={
                                                      customOnChangeSelectHandler
                                                    }
                                                    options={dropdownOptions}
                                                  />
                                                )}
                                              </Grid>
                                              {/* {formik.values.showImage &&
                                                (
                                                  <Grid item xs={12}>
                                                    <FormikControl
                                                      control={"image"}
                                                      label={"upload image"}
                                                      name={`options.${index}.asset`}
                                                      initUrl={
                                                        inventories.data.find(
                                                          (inventory) =>
                                                            inventory.id ===
                                                            formik.values
                                                              .options[index]
                                                              .asset
                                                        )?.image?.path
                                                      }
                                                    />
                                                  </Grid>
                                                )} */}
                                              {formik.values.showImage && (
                                                <Grid item xs={12}>
                                                  <FormikControl
                                                    control={"imageFormikState"}
                                                    label={"upload image"}
                                                    name={`options.${index}.asset`}
                                                    disabled={
                                                      formik.values.manyRelate
                                                        ? formik.values.options[
                                                            index
                                                          ].inventoryIdList
                                                            .length <= 0
                                                        : formik.values.options[
                                                            index
                                                          ].inventoryId === ""
                                                    }
                                                  />
                                                </Grid>
                                              )}
                                              {/* {formik.values.showImage &&
                                                formik.values
                                                  .inventoryImage && (
                                                  <Grid item xs={12}>
                                                    <Box
                                                      display={"flex"}
                                                      sx={{
                                                        // m: 1,
                                                        mx: 1,
                                                        mb: 2,
                                                        mt: -1,
                                                      }}
                                                    >
                                                      <FormControl
                                                        sx={{
                                                          minWidth: 120,
                                                          width: "100%",
                                                        }}
                                                        error={
                                                          !inventories.data.find(
                                                            (inventory) =>
                                                              inventory.id ===
                                                              formik.values
                                                                .options[index]
                                                                .inventoryId
                                                          )?.image?.path
                                                            ? true
                                                            : false

                                                          // meta.touched &&
                                                          // meta.error
                                                        }
                                                        fullWidth
                                                      >
                                                 
                                                        <Typography
                                                          component={"label"}
                                                          variant="caption"
                                                          color={"grey.600"}
                                                        >
                                                          Image from product in
                                                          inventory
                                                        </Typography>
                                                        <Box
                                                          display={"flex"}
                                                          justifyContent={
                                                            "flex-start"
                                                          }
                                                          sx={{
                                                            p: 2,
                                                            w: 1,
                                                            border:
                                                              "2px dashed grey",
                                                            // borderColor: "error.main",
                                                            borderColor:
                                                              "grey.500",
                                                            borderRadius: 1,
                                                            bgcolor: "grey.50",
                                                          }}
                                                        >
                                                          <Box
                                                            display={"flex"}
                                                            flexDirection="column"
                                                            flexGrow={1}
                                                            alignContent={
                                                              "flex-start"
                                                            }
                                                          >
                                                            <Box
                                                              flexGrow={1}
                                                              display={"flex"}
                                                              gap={1}
                                                              flexWrap="wrap"
                                                            >
                                                          
                                                              {console.log(
                                                                inventories.data.find(
                                                                  (inventory) =>
                                                                    inventory.id ===
                                                                    formik
                                                                      .values
                                                                      .options[
                                                                      index
                                                                    ]
                                                                      .inventoryId
                                                                )?.image?.path
                                                              )}
                                                              {inventories.data.find(
                                                                (inventory) =>
                                                                  inventory.id ===
                                                                  formik.values
                                                                    .options[
                                                                    index
                                                                  ].inventoryId
                                                              )?.image
                                                                ?.path && (
                                                                <PreviewImage
                                                            
                                                                  url={
                                                                    inventories.data.find(
                                                                      (
                                                                        inventory
                                                                      ) =>
                                                                        inventory.id ===
                                                                        formik
                                                                          .values
                                                                          .options[
                                                                          index
                                                                        ]
                                                                          .inventoryId
                                                                    )?.image
                                                                      ?.path ||
                                                                    null
                                                                  }
                                                                />
                                                              )}
                                                            </Box>
                                                          </Box>
                                                        </Box>
                                                  
                                                        {!inventories.data.find(
                                                          (inventory) =>
                                                            inventory.id ===
                                                            formik.values
                                                              .options[index]
                                                              .inventoryId
                                                        )?.image?.path && (
                                                          <FormHelperText>
                                                            {
                                                              "You must select product from inventory first"
                                                            }
                                                          </FormHelperText>
                                                        )}
                                                      </FormControl>
                                                    </Box>
                                                  </Grid>
                                                )} */}
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
                                              disabled={
                                                formik.values.options.length <=
                                                1
                                              }
                                              onClick={() => {
                                                if (
                                                  formik.values.options.length >
                                                  1
                                                )
                                                  arrayHelpers.remove(index);
                                              }}
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
