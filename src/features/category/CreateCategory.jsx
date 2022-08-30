import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate } from "react-router-dom";
import {
  selectAllCategories,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../categorySlice";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FormCategory2 from "../../components/FormMain/FormCategory2";
import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../utils/sweetAlertUtil";
const CreateCategory = () => {
  const navigate = useNavigate();

  const [createCategory] = useCreateCategoryMutation();

  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCategoriesQuery(1, 200);

  const dropdownOptions2 = isSuccess
    ? categories.data.map((category) => ({
        key: category.name,
        value: category.id,
      }))
    : [];
  dropdownOptions2.unshift({ key: "Select a option", value: "" });
  const initialValues = {
    parentId: "",
    name: "",
    // image: "",
    // allow: false,
  };

  const validationSchema = Yup.object({
    //parentId: Yup.string().required(),
    // name: Yup.string().required(),
    // allow: Yup.boolean(),
  });
  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await createCategory(values).unwrap();
      swalSaveSuccess();
      navigate("/category");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HeadingCrud label={"Create new category"} backTo={-1} />
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

export default CreateCategory;
