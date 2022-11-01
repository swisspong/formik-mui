import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "./orderApiSlice";
import MediaControlCard from "../../components/CardProduct";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Section from "../../components/Section";
import OrderTable from "../../components/orderComp/OrderTable";
import OrderTableCollapse from "../../components/orderComp/OrderTableCollapse";
import PreviewImage from "../../components/FormUi/PreviewImage";
import DialogImage from "../../components/DialogImage";
import StepperStatus from "../../components/StepperStatus";

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
          <StepperStatus />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <OrderTableCollapse order={order} />
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Section label={"Recipient"} info={order?.recipientName} />
                    <Section label={"Address"} info={order?.address} />
                    <Section label={"Phone"} info={order?.phone} />
                    <Section
                      label={"Payment Method"}
                      info={order?.paymentMethod}
                    />
                    <Section
                      label={"Total price of slip"}
                      info={
                        order?.slip.reduce(
                          (prev, curr) => Number(prev) + Number(curr.price),
                          0
                        ) +
                        ` (${
                          order.totalPrice -
                          order?.slip.reduce(
                            (prev, curr) => Number(prev) + Number(curr.price),
                            0
                          )
                        }) Left`
                      }
                    />
                  </Paper>
                </Grid>
                {/* <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Section
                      label={"Payment Method"}
                      info={
                        order?.paymentMethod === "SLIP" ? "Attach Slip" : ""
                      }
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        mx: 1,
                        my: 2,
                      }}
                    >
                      <PreviewImage
                        url={
                          "https://f.ptcdn.info/762/058/000/pc91rhf9olTmLDj35rR-s.jpg"
                        }
                      />

                      <DialogImage />
                    </Box>
                  </Paper>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Paper sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mx: 1,
                  }}
                >
                  {order?.slip.map((slip, index) => (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                  
                      <PreviewImage url={slip.image.path} />

                      <Section
                        label={"Refer ID"}
                        info={slip.referId || "please verified"}
                        mb={0}
                      />
                      <Section
                        label={"Price"}
                        info={slip.price || "please verifeid"}
                        mb={0}
                      />
                      <DialogImage
                        orderId={orderId}
                        slipId={slip.id}
                        slip={slip}
                      />
                    </Box>
                  ))}
                </Box>
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
