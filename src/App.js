import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik, FieldArray, Field } from "formik";

import SelectWrapper from "./components/FormUi/SelectWrapper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import * as Yup from "yup";

import TextFieldWrapper from "./components/FormUi/TextFieldWrapper";
import SwitchWrapper from "./components/FormUi/SwitchWrapper";
import ImageWrapper from "./components/FormUi/ImageWrapper";
import PreviewImage from "./components/FormUi/PreviewImage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import Layout from "./components/Layout";
import FormProduct from "./components/FormMain/FormProduct";
import FormCategory from "./components/FormMain/FormCategory";
import FormInventory from "./components/FormMain/FormInventory";
import CategoryTable from "./components/TableMain/CategoryTable";
import InventoryTable from "./components/TableMain/InventoryTable";
import ProductTable from "./components/TableMain/ProductTable";
function App() {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route path="category">
            <Route index element={<CategoryTable />} />
            <Route path="create" element={<FormCategory />} />
          </Route>
          <Route path="inventory">
                 <Route index element={<InventoryTable />} />
            <Route path="create" element={<FormInventory />} />
          </Route>
          <Route path="product">
          <Route index element={<ProductTable />} />
            <Route path="create" element={<FormProduct />} />
          </Route>
        </Route>
      </Routes>
      {/* <ResponsiveDrawer /> */}

      {/* <SignIn/> */}
      {/* <Navbar /> */}
      {/* <Box height="100%">
        <Stack direction={"row"} spacing={2} height="100%">
          <Sidebar />
          <Box flex={5} p={2} pr={5}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ mb: 2 }}
            >
              {breadcrumbs}
            </Breadcrumbs>
            <Paper sx={{ p: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  // console.log(formik.values);
                  console.log("Formik error", formik.errors);
                  return (
                    <Form>
                      <TextFieldWrapper
                        name={"name"}
                        label={"Name of product"}
                        fullWidth
                      />
                      <TextFieldWrapper
                        name={"availableStock"}
                        label={"Available Stock"}
                        type={"number"}
                        fullWidth
                      />
                      <TextFieldWrapper
                        name={"description"}
                        label={"Description"}
                        fullWidth
                      />
                      <ImageWrapper
                        label={"upload image(s)"}
                        name={"file"}
                        multiple
                      />

                      <SwitchWrapper
                        name={"option"}
                        label={"option"}
                        changeHandler={switchOptionHandler}
                      />
                      {formik.values.option ? (
                        <Box p={2} border={1}>
                          <FieldArray
                            name="optionList"
                            render={(arrayHelpers) => (
                              <div>
                                {formik.values.optionList &&
                                formik.values.optionList.length > 0 ? (
                                  formik.values.optionList.map(
                                    (option, index) => (
                                      <div key={index}>
                                        <SwitchWrapper
                                          name={`optionList.${index}.manyRelate`}
                                          label={"Many Relate"}
                                        />
                                        <SwitchWrapper
                                          name={`optionList.${index}.showImage`}
                                          label={"Show Image"}
                                        />
                                        <TextFieldWrapper
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
                                                formik.values.optionList
                                                  .length <= 1
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
                                      </div>
                                    )
                                  )
                                ) : (
                                  <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() =>
                                      arrayHelpers.push({ name: "" })
                                    }
                                  >
                                    Add a Option Group
                                  </Button>
                                )}
                              </div>
                            )}
                          />
                        </Box>
                      ) : (
                        <SelectWrapper
                          name={"inventoryId"}
                          label={"Select a topic"}
                          options={dropdownOptions}
                        />
                      )}
                      <Box m={1}>
                        <Button type="submit" variant="contained">
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Paper>
          </Box>
        </Stack>
      </Box> */}
    </BrowserRouter>
  );
}

export default App;
