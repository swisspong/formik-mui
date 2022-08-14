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
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik, FieldArray } from "formik";

import SelectWrapper from "./components/FormUi/SelectWrapper";

import * as Yup from "yup";

import TextFieldWrapper from "./components/FormUi/TextFieldWrapper";
import SwitchWrapper from "./components/FormUi/SwitchWrapper";
function App() {
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
                  itemList: [{ name: "" }],
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
    availableStock: 0,
    description: "",
    option: false,
    inventoryId: "",
    optionList: [
      {
        manyRelate: true,
        showImage: false,
        name: "",
        itemList: [{ name: "" }],
      },
    ],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    availableStock: Yup.number().min(0),
    description: Yup.string().required(),
    inventoryId: Yup.string().required(),
    image: [],
    optionList: Yup.array()
      .of(Yup.object({ name: Yup.string().required() }))
      .min(1),
  });
  const onSubmit = (values) => console.log("formik values", values);
  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik.values);
            // console.log("Formik error", formik.errors);
            return (
              <Form>
                <TextFieldWrapper
                  name={"name"}
                  label={"Name of product"}
                  fullWidth
                />
                <TextFieldWrapper
                  name={"description"}
                  label={"Description"}
                  fullWidth
                />
                <SelectWrapper
                  name={"selectTest"}
                  label={"Select a topic"}
                  options={dropdownOptions}
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
                            formik.values.optionList.map((option, index) => (
                              <div key={index}>
                                <SwitchWrapper
                                  name={`optionList.${index}.manyRelate`}
                                  label={"Many Relate"}
                                />
                                <TextFieldWrapper
                                  name={`optionList.${index}.name`}
                                  label={`Name of option ${index + 1}`}
                                  fullWidth
                                />
                                <Box p={2}>
                                  <SelectWrapper
                                    name={"selectTest"}
                                    label={"Select a topic"}
                                    options={dropdownOptions}
                                  />
                                </Box>
                                <Box ml={1}>
                                  <ButtonGroup variant="contained">
                                    <Button
                                      onClick={() => arrayHelpers.remove(index)}
                                      disabled={
                                        formik.values.optionList.length <= 1
                                      }
                                    >
                                      -
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        arrayHelpers.insert(index, { name: "" })
                                      }
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
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
      </Grid>
    </Grid>
  );
}

export default App;
