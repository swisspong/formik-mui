import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectAllCategories,
  selectCategoryById,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../categorySlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FormCategory2 from "../../components/FormMain/FormCategory2";
const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = useSelector((state) =>
    selectCategoryById(state, Number(categoryId))
  );
  console.log(category);
  const [updateCategory] = useUpdateCategoryMutation();
  const { isError, isLoading, isSuccess, error } = useGetCategoriesQuery();
  const categories = useSelector(selectAllCategories);
  const dropdownOptions2 = isSuccess
    ? categories.map((category) => ({
        key: category.name,
        value: category.id,
      }))
    : [];
  dropdownOptions2.unshift({ key: "Select a option", value: "" });
  const initialValues = {
    parentId: category?.parentId ? category.parentId : "",
    name: category?.name,
  };

  const validationSchema = Yup.object({
    // parentId: Yup.string().required(),
    // name: Yup.string().required(),
  });
  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      await updateCategory({ categoryId, initialCategory: values }).unwrap();
      navigate("/category");
    } catch (error) {
      console.error("Failed to save the post", error);
    }
  };

  return (
    <>
      <HeadingCrud label={"Update category"} backTo={-1} />
      {isSuccess && (
        <FormCategory2
          dropdownOptions={dropdownOptions2}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}
    </>
  );
};

export default EditCategory;
