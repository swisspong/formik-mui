import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import {
  useCreateProductMutation,
  useGetProductByIdQuery,
} from "../productApiSlice";
import FormVariant from "./FormVariant";
import HeadingCrud from "../../../components/HeadingCrud";
import {
  swalCreateFail,
  swalLoadingNew,
  swalSaveSuccess,
} from "../../../utils/sweetAlertUtil";
import FormVariantV2 from "./FormVariantV2";

import FormVariantStack from "./FormVariantStack";
import { useEffect } from "react";
const UpsertVariant = () => {
  const { productId } = useParams();
  const [initFormik, setInitFormik] = useState();
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: product, isSuccess } = useGetProductByIdQuery(productId);

  // useEffect(() => {
  //   const optionGroupHandler = () => {
  //     setInitFormik({ id: 2 });
  //   };
  //   if (isSuccess) {
  //     optionGroupHandler();
  //   }
  // }, [isSuccess, product]);
  console.log(productId);
  const initialValues = {
    variants: product?.optionGroupList,
  };
  const validationSchema = Yup.object({
    // categoryId: Yup.string().required(),
    // inventoryId: Yup.string().required(),
    // name: Yup.string().required(),
    // availableStock: Yup.number().integer().min(0).required(),
    // price: Yup.number().min(0).required(),
    // description: Yup.string().required(),
  });

  const onSubmit = async (values) => {
    try {
      console.log("formik values", values);
      swalLoadingNew();
      await createProduct(values).unwrap();
      swalSaveSuccess();
      navigate("/product");
    } catch (error) {
      swalCreateFail(error.data.message);
      console.error("Failed to save the post", error.data.message);
    }
  };

  return (
    <>
      <HeadingCrud label={"Manage variants"} backTo={-1} />
      {isSuccess && (
        <FormVariantStack
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}

      {/* <DataTable
        columns={columns(deleteCategory)}
        data={isSuccess ? categories.data : []}
        progressPending={isLoading}
        onChangePage={changePageHandler}
        onChangeRowsPerPage={rowsPerPageHandler}
        pagination
        paginationServer
        paginationTotalRows={isSuccess && categories.total}
        responsive
      /> */}
      {/* <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </>
  );
};

export default UpsertVariant;
