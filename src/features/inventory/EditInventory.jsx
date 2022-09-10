import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../categorySlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FormCategory2 from "../../components/FormMain/FormCategory2";
import {
  swalCreateFail,
  swalEditSuccess,
  swalLoadingNew,
} from "../../utils/sweetAlertUtil";
import FormInventory2 from "./FormInventory2";
import {
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
} from "./inventoryApiSlice";
const EditInventory = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();

  const { data: inventory, isSuccess: isSuccessInventory } =
    useGetInventoryByIdQuery(inventoryId);
  const [updateInventory] = useUpdateInventoryMutation();
  console.log(inventory);
  const initialValues = {
    name: inventory?.name,
    cost: inventory?.costPrice,
    quantity: inventory?.quantity,
    asset: inventory?.imageId || "",
  };

  const validationSchema = Yup.object({
    // parentId: Yup.string().required(),
    // name: Yup.string().required(),
  });

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await updateInventory({
        id: inventoryId,
        initialInventory: values,
      }).unwrap();
      swalEditSuccess();
      navigate(-1);
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error);
    }
  };

  return (
    <>
      <HeadingCrud label={"Update category"} backTo={-1} />
      {isSuccessInventory && (
        <FormInventory2
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initUrl={inventory?.image?.path}
        />
      )}
    </>
  );
};

export default EditInventory;
