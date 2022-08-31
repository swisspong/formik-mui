import { Paper } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import HeadingCrud from "../../components/HeadingCrud";
import Section from "../../components/Section";
import { formatDate } from "../../utils/formatDate";

import {
  useDeleteInventoryMutation,
  useGetInventoryByIdQuery,
} from "./inventoryApiSlice";

const ViewInventory = () => {
  const { inventoryId } = useParams();
  const { data: inventory, isSuccess } = useGetInventoryByIdQuery(inventoryId);
  const [deleteInventory] = useDeleteInventoryMutation();
  console.log(inventory);
  return (
    <>
      <HeadingCrud
        label={"View category"}
        backTo={-1}
        editPath={`/inventory/edit/${inventoryId}`}
        deleteHandler={() => deleteInventory({ id: inventoryId })}
      />
      {isSuccess && (
        <Paper sx={{ p: 4 }}>
          <Section label={"ID"} info={inventory?.id} />

          <Section label={"Product in inventory name"} info={inventory?.name} />
          <Section label={"Cost price"} info={inventory?.costPrice} />
          <Section label={"Quantity"} info={inventory?.quantity} />
          <Section
            label={"created at"}
            info={formatDate(inventory?.updatedAt)}
          />
          <Section
            label={"updated at"}
            info={formatDate(inventory?.createdAt)}
          />
        </Paper>
      )}
    </>
  );
};

export default ViewInventory;
