import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import PreviewImage from "../../components/FormUi/PreviewImage";
import HeadingCrud from "../../components/HeadingCrud";
import Section from "../../components/Section";
import { formatDate } from "../../utils/formatDate";
import { useDeleteInventoryMutation } from "../inventory/inventoryApiSlice";

// import { useDeleteInventoryMutation } from "./inventoryApiSlice";
import { useGetProductByIdQuery } from "./productApiSlice";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
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
          <Section label={"Description"} info={product?.description} />
          <Box
            display={"flex"}
            sx={{
              // m: 1,
              mx: 0,
              mb: 2,
              mt: -1,
            }}
          >
            <Box
              sx={{
                minWidth: 120,
                width: "100%",
              }}
            >
              <Typography
                component={"label"}
                variant="caption"
                color={"grey.600"}
              >
                Preview image
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                sx={{
                  p: 2,
                  w: 1,
                  border: "2px dashed grey",
                  // borderColor: "error.main",
                  borderColor: "grey.500",
                  borderRadius: 1,
                  bgcolor: "grey.50",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection="column"
                  flexGrow={1}
                  alignContent={"flex-start"}
                >
                  <Box flexGrow={1} display={"flex"} gap={1} flexWrap="wrap">
                    {product.productImage.map((item) => (
                      <PreviewImage url={item.image.path} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{mb:2}}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Option group</TableCell>
                  <TableCell>Optoins</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.optionGroupList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Paper
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          m: 0,
                        }}
                        component="ul"
                      >
                        {row.options.map((option) => (
                          <ListItem>
                            <Chip
                              //color="secondary"
                              // variant="outlined"
                              // icon={icon}
                              label={option.name}
                              // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            />
                          </ListItem>
                        ))}
                      </Paper>
                      {/* {row.options.map(optoin=>)} */}
                    </TableCell>
                    {/* <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
                {/* {product.optionGroupList[index].options.map((row) => (
                            <Row key={row.name} row={row} />
                          ))} */}
                {/* {rows.map((row) => (
                                            <Row key={row.name} row={row} />
                                          ))} */}
              </TableBody>
            </Table>
          </TableContainer>
          <Section label={"created at"} info={formatDate(product?.updatedAt)} />
          <Section label={"updated at"} info={formatDate(product?.createdAt)} />
        </Paper>
      )}
    </>
  );
};

export default ViewProduct;
