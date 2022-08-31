import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../utils/sweetAlertUtil";

import FormProduct2 from "./FormProduct2";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
} from "./productApiSlice";
const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: product, isSuccess } = useGetProductByIdQuery(productId);
  console.log(productId)
  const initialValues = {
    categoryId: product?.categoryId,
    inventoryId: product?.inventoryId,
    name: product?.name,
    availableStock: product?.availableStock,  
    price: Number(product?.price).toFixed(2),
    description: product?.description,
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
      <HeadingCrud label={"Update product"} backTo={-1} />
      {isSuccess && (
        <FormProduct2
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          edit={true}
        />
      )}
    </>
  );
};

export default EditProduct;
