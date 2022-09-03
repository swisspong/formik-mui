import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";
import HeadingCrud from "../../../../components/HeadingCrud";
import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../../../utils/sweetAlertUtil";
import { useGetInventoriesQuery } from "../../../inventory/inventoryApiSlice";
import {
  useGetProductByIdQuery,
  useUpdateOptoinsMutation,
} from "../../productApiSlice";
import FormOptions from "./FormOptions";

const UpdateOption = () => {
  const { productId, optionGroupId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [updateOptions] = useUpdateOptoinsMutation();

  const optionGroup = product?.optionGroupList?.find(
    (optionGroup) => optionGroup.id === Number(optionGroupId)
  );
  const [initFormik, setInitFormik] = useState({
    manyRelate: false,
    showImage: false,
    options: [
      {
        name: "",
        price: 0,
        inventoryId: "",
      },
    ],
  });
  // console.log(optionGroup);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log(product);
      console.log(initFormik);
      setInitFormik({
        manyRelate: optionGroup?.manyRelate ? optionGroup.manyRelate : false,
        showImage: false,
        options: optionGroup?.options
          ? optionGroup.options.map((option) => ({
              id: option.id,
              name: option.name,
              price: Number(option.price),
              ...(optionGroup.manyRelate
                ? {
                    inventoryIdList: option.optionInventoryList.map(
                      (optionInventory) => optionInventory.inventory.id
                    ),
                  }
                : { inventoryId: option.optionInventoryList[0].inventory.id }),
            }))
          : [
              {
                name: "",
                price: 0,
                inventoryId: "",
              },
            ],
      });
    }
  }, [isSuccess, product]);

  const initialValues = {
    // manyRelate: optionGroup?.manyRelate ? optionGroup.manyRelate : false,
    manyRelate: optionGroup?.manyRelate ? optionGroup.manyRelate : false,
    showImage: false,
    // options: [
    //   {
    //     name: "",
    //     price: 0,
    //     inventoryId: "",
    //   },
    // ],
    options: optionGroup?.options
      ? optionGroup.options.map((option) => ({
          id: option.id,
          name: option.name,
          price: Number(option.price),
          ...(optionGroup.manyRelate
            ? {
                inventoryIdList: option.optionInventoryList.map(
                  (optionInventory) => optionInventory.inventory.id
                ),
              }
            : { inventoryId: option.optionInventoryList[0].inventory.id }),
        }))
      : [
          {
            name: "",
            price: 0,
            inventoryId: "",
          },
        ],
  };
  const validationSchema = Yup.object({
    // variants: Yup.array()
    //   .of(Yup.object({ name: Yup.string().required() }))
    //   .min(1),
  });
  // const onSubmit = (values) => console.log("formik values", values);

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await updateOptions({
        id: productId,
        optionGroupId,
        initialOptions: values,
      }).unwrap();
      swalSaveSuccess();

      // refetch();
      // navigate("/product");
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
      {isSuccess && !isLoading && (
        <FormOptions
          initialValues={initFormik}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}
    </>
  );
};

export default UpdateOption;