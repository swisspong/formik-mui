import { Paper } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import HeadingCrud from "../../components/HeadingCrud";
import Section from "../../components/Section";
import { formatDate } from "../../utils/formatDate";
import { useDeleteInventoryMutation } from "../inventory/inventoryApiSlice";

// import { useDeleteInventoryMutation } from "./inventoryApiSlice";
import { useGetProductByIdQuery } from "./productApiSlice";

const ViewProduct = () => {
  const { productId } = useParams();
  const { data: product, isSuccess } = useGetProductByIdQuery(productId);
  const [deleteInventory] = useDeleteInventoryMutation();
  console.log(product);
  return (
    <>
      <HeadingCrud
        label={"View product"}
        backTo={-1}
        editPath={`/product/edit/${productId}`}
        deleteHandler={() => deleteInventory({ id: productId })}
      />
      {isSuccess && (
        <Paper sx={{ p: 4 }}>
          <Section label={"ID"} info={product?.id} />

          <Section label={"Product name"} info={product?.name} />
          <Section label={"price"} info={product?.price} />
          <Section label={"Available stock"} info={product?.availableStock} />
          <Section label={"created at"} info={formatDate(product?.updatedAt)} />
          <Section label={"updated at"} info={formatDate(product?.createdAt)} />
        </Paper>
      )}
    </>
  );
};

export default ViewProduct;
