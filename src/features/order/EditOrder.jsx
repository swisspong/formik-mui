import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "./orderApiSlice";
import MediaControlCard from "../../components/CardProduct";
import { Grid, Paper } from "@mui/material";
import Section from "../../components/Section";
// import {
//   useGetCategoryByIdQuery,
//   useUpdateCategoryMutation,
// } from "../categorySlice";
// import { useSelector } from "react-redux";
// import * as Yup from "yup";
// import FormCategory2 from "../../components/FormMain/FormCategory2";
// import {
//   swalCreateFail,
//   swalEditSuccess,
//   swalLoadingNew,
// } from "../../utils/sweetAlertUtil";
// import FormInventory2 from "./FormInventory2";
// import {
//   useGetInventoryByIdQuery,
//   useUpdateInventoryMutation,
// } from "./inventoryApiSlice";
const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isSuccess } = useGetOrderByIdQuery(orderId);

  // const { data: inventory, isSuccess: isSuccessInventory } =
  //   useGetInventoryByIdQuery(inventoryId);
  // const [updateInventory] = useUpdateInventoryMutation();
  // console.log(inventory);
  // const initialValues = {
  //   name: inventory?.name,
  //   cost: inventory?.costPrice,
  //   quantity: inventory?.quantity,
  //   asset: inventory?.imageId || "",
  // };

  // const validationSchema = Yup.object({
  //   // parentId: Yup.string().required(),
  //   // name: Yup.string().required(),
  // });

  // const onSubmit = async (values) => {
  //   try {
  //     console.log("formik values", values);
  //     swalLoadingNew();
  //     await updateInventory({
  //       id: inventoryId,
  //       initialInventory: values,
  //     }).unwrap();
  //     swalEditSuccess();
  //     navigate(-1);
  //   } catch (error) {
  //     swalCreateFail(error.data.message);
  //     console.error("Failed to save the post", error);
  //   }
  // };

  return (
    <>
      <HeadingCrud label={"Edit Order"} backTo={-1} />
      {/* {isSuccessInventory && (
        <FormInventory2
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initUrl={inventory?.image?.path}
        />
      )} */}
      {isSuccess && (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Grid container spacing={3}>
                {order.orderItem.map((item) => (
                  <Grid item xs={4}>
                    <MediaControlCard orderItem={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 2 }}>
             
              <Section label={"Recipient"} info={order?.recipientName} />
              <Section label={"Address"} info={order?.address} />
              <Section label={"Phone"} info={order?.phone} />
              </Paper>
            </Grid>
          </Grid>
          {/* <MediaControlCard /> */}
        </Paper>
      )}
    </>
  );
};

export default EditOrder;
