import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectAllCategories,
  selectCategoryById,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
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
const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  // const category = useSelector((state) =>
  //   selectCategoryById(state, Number(categoryId))
  // );
  const { data: category, isSuccess: isSuccessCategory } =
    useGetCategoryByIdQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();
  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCategoriesQuery({ page: 1, per_page: 200 });

  const dropdownOptions2 = isSuccess
    ? categories.data.map((category) => ({
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
      swalLoadingNew();
      await updateCategory({ categoryId, initialCategory: values }).unwrap();
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
      {isSuccess && isSuccessCategory && (
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
