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
const EditInventory = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();

  const { data: inventory, isSuccess: isSuccessInventory } =
    useGetCategoryByIdQuery(inventoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  const initialValues = {
    name: "",
    cost: 0,
    quantity: 0,
  };

  const validationSchema = Yup.object({
    // parentId: Yup.string().required(),
    // name: Yup.string().required(),
  });
  
  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await updateCategory({
        id: Number(categoryId),
        initialCategory: values,
      }).unwrap();
      swalEditSuccess();
      navigate("/category");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error);
    }
  };

  return (
    <>
      <HeadingCrud label={"Update category"} backTo={-1} />
      { isSuccessCategory && (
        <FormInventory2
    
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}
    </>
  );
};

export default EditInventory;
