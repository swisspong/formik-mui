import React from "react";
import HeadingCrud from "../../components/HeadingCrud";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "./orderApiSlice";
import MediaControlCard from "../../components/CardProduct";
import {
  Box,
  Chip,
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
import VerticalLinearStepper from "./VerticalLinearStepper";
import DotsMobileStepper from "./DotsMobileStepper";
import FormSlipAdmin from "./FormSlipAdmin";

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
          <Grid sx={{ mt: 1 }} container spacing={3}>
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
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Paper sx={{ p: 2 }}>
                <VerticalLinearStepper
                  orderId={orderId}
                  stepCount={
                    order.status === "PENDING"
                      ? 0
                      : order.status === "AUTHORIZE"
                      ? 1
                      : order.status === "PAID" ||
                        order.status === "INVALID_SLIP"
                      ? 1
                      : order.status === "PACKING"
                      ? 2
                      : order.status === "DELIVERED"
                      ? 3
                      : 0
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
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
                      <PreviewImage
                        url={slip.image.path}
                        chipStatus={
                          <Chip
                            label={slip.verified ? "Verified" : "Not Verify"}
                            color={slip.verified ? "success" : "warning"}
                            size="small"
                            sx={{ position: "absolute", top: 5, right: 5 }}
                          />
                        }
                      />

                      <Section label={"message"} info={slip.message} mb={0} />
                      <Section
                        label={"Refer ID"}
                        info={
                          slip.verified && slip.referId === null
                            ? "No refer Id"
                            : slip.referId
                        }
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
                {/* <DotsMobileStepper/> */}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2 }}>
                <Typography mb={1}>Slip to customer</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mx: 1,
                  }}
                >
                  {/* {order?.slip.map((slip, index) => (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <PreviewImage
                        url={slip.image.path}
                        chipStatus={
                          <Chip
                            label={slip.verified ? "Verified" : "Not Verify"}
                            color={slip.verified ? "success" : "warning"}
                            size="small"
                            sx={{ position: "absolute", top: 5, right: 5 }}
                          />
                        }
                      />

                      <Section label={"message"} info={slip.message} mb={0} />
                      <Section
                        label={"Refer ID"}
                        info={
                          slip.verified && slip.referId === null
                            ? "No refer Id"
                            : slip.referId
                        }
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
                  ))} */}
                  <FormSlipAdmin initialValues={{ asset: "" }} />
                </Box>
                {/* <DotsMobileStepper/> */}
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
