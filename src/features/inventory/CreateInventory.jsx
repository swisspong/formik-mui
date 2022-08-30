import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../utils/sweetAlertUtil";
import FormInventory2 from "./FormInventory2";
import { useCreateInventoryMutation } from "./inventoryApiSlice";
const CreateInventory = () => {
  const navigate = useNavigate();

  const [createInventory] = useCreateInventoryMutation();

  const initialValues = {
    name: "",
    
    cost: 0,
    quantity: 0,
  };

  const validationSchema = Yup.object({});
  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await createInventory(values).unwrap();
      swalSaveSuccess();
      navigate("/inventory");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };

  return (
    <>
      <HeadingCrud label={"Create new inventory"} backTo={-1} />

      <FormInventory2
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      />
    </>
  );
};

export default CreateInventory;
