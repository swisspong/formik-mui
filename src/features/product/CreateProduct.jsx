import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../utils/sweetAlertUtil";

import FormProduct2 from "./FormProduct2";
import { useCreateProductMutation } from "./productApiSlice";
const CreateProduct = () => {
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();

  const initialValues = {
    categoryId: "",
    inventoryId: "",
    name: "",
    availableStock: 0,
    price: 0.0,
    description: "",
  };
  const validationSchema = Yup.object({
    // categoryId: Yup.string().required(),
    // inventoryId: Yup.string().required(),
    // name: Yup.string().required(),
    // availableStock: Yup.number().integer().min(0).required(),
    // price: Yup.number().min(0).required(),
    // description: Yup.string().required(),
  });

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await createProduct(values).unwrap();
      swalSaveSuccess();
      navigate("/product");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };

  return (
    <>
      <HeadingCrud label={"Create new product"} backTo={-1} />

      <FormProduct2
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      />
    </>
  );
};

export default CreateProduct;
