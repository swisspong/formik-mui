import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../components/FormUi/FormikControl";
import { useGetCategoriesQuery } from "../categorySlice";
import { useGetInventoriesQuery } from "../inventory/inventoryApiSlice";
import { useGetProductByIdQuery } from "./productApiSlice";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const FormProductEdit = ({
  initialValues,
  validationSchema,
  onSubmit,
  edit = false,
  initUrl = null,
}) => {
  const { productId } = useParams();
  const [tags, setTags] = useState([]);
  const { data: product, isSuccess: isSuccessProduct } =
    useGetProductByIdQuery(productId);
  console.log(product);
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
                    name={"asset"}
                    initUrl={initUrl}
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
                  {edit && (
                    <TableContainer>
                      <Table size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Option group</TableCell>
                            <TableCell>Optoins</TableCell>
                            {/* <TableCell align="right">
                                              Quantity
                                            </TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product.optionGroupList.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Paper
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                    listStyle: "none",
                                    p: 0.5,
                                    m: 0,
                                  }}
                                  component="ul"
                                  elevation={2}
                                  variant="outlined"
                                >
                                  {row.options.map((option) => (
                                    <ListItem>
                                      <Chip
                                        color="secondary"
                                        variant="outlined"
                                        // icon={icon}
                                        label={option.name}
                                        // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                      />
                                    </ListItem>
                                  ))}
                                </Paper>
                                {/* {row.options.map(optoin=>)} */}
                              </TableCell>
                              {/* <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                          ))}
                          {/* {product.optionGroupList[index].options.map((row) => (
                            <Row key={row.name} row={row} />
                          ))} */}
                          {/* {rows.map((row) => (
                                            <Row key={row.name} row={row} />
                                          ))} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
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

export default FormProductEdit;
