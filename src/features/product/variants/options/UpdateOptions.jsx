import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";
import HeadingCrud from "../../../../components/HeadingCrud";
import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../../../utils/sweetAlertUtil";
import { useGetProductByIdQuery } from "../../productApiSlice";
import FormOptions from "./FormOptions";

const UpdateOption = () => {
  const { productId, optionGroupId } = useParams();
  const navigate = useNavigate();

  const { data: product, isSuccess } = useGetProductByIdQuery(productId);
  console.log(productId);
  const initialValues = {
    variants: product?.optionGroupList,
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
      // await createProduct(values).unwrap();
      swalSaveSuccess();
      navigate("/product");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };

  return (
    <>
      <HeadingCrud
        label={`Manage ${
          product?.optionGroupList?.find(
            (optionGroup) => optionGroup.id === Number(optionGroupId)
          ).name
        } options`}
        backTo={-1}
      />
      {isSuccess && (
        <FormOptions
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}
    </>
  );
};

export default UpdateOption;
