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
import {
  useGetOptionListByProductIdAndOptionGroupIdQuery,
  useUpdateOptoinListByProductIdAndOptionGroupIdMutation,
} from "./optionApiSlice";

const UpdateOption = () => {
  const { productId, optionGroupId } = useParams();
  const {
    data: optionGroup,
    isLoading,
    isSuccess,
  } = useGetOptionListByProductIdAndOptionGroupIdQuery({
    productId,
    optionGroupId,
  });

  //const [updateOptions] = useUpdateOptoinsMutation();
  const [updateOptions] =
    useUpdateOptoinListByProductIdAndOptionGroupIdMutation();

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
  console.log(optionGroup);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setInitFormik({
        manyRelate: optionGroup?.manyRelate ? optionGroup.manyRelate : false,
        showImage: optionGroup.showImage || false,

        // ...(optionGroup.showImage && { inventoryImage: false }),
        options: optionGroup?.options
          ? optionGroup.options.map((option) => ({
              id: option.id,
              name: option.name,
              price: Number(option.price),

              ...(optionGroup.showImage && {
                asset: { id: option.image.id, path: option.image.path },
              }),
              ...(optionGroup.manyRelate
                ? {
                    inventoryIdList: option.optionInventoryList.map(
                      (optionInventory) => optionInventory.inventory.id
                    ),
                  }
                : {
                    inventoryId:
                      option.optionInventoryList[0]?.inventory.id || "",
                  }),
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
  }, [isSuccess, optionGroup]);

  const validationSchema = Yup.object({
    // variants: Yup.array()
    //   .of(Yup.object({ name: Yup.string().required() }))
    //   .min(1),
  });
  // const onSubmit = (values) => console.log("formik values", values);

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);

      // const formatPresubmit = Object.assign({}, values);
      // formatPresubmit.options = [
      //   ...(values.showImage
      //     ? values.options.map((option) => ({
      //         ...option,
      //         asset: option.asset.id,
      //       }))
      //     : values),
      // ];
      // console.log("pre submit", formatPresubmit);

      swalLoadingNew();
      await updateOptions({
        productId,
        optionGroupId,
        body: values,
      }).unwrap();
      swalSaveSuccess();
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };

  return (
    <>
      <HeadingCrud label={`Manage ${optionGroup?.name} options`} backTo={-1} />
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
