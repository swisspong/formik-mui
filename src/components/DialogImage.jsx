import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormVerifiedOrder from "../features/order/FormVerifiedOrder";
import { useVerifiedSlipMutation } from "../features/order/orderApiSlice";

export default function DialogImage({ orderId, slipId, slip }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [verifiedSlip] = useVerifiedSlipMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {slip?.verified === true ? "Verified Slip" : "Verify Slip"}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Slip View</DialogTitle>
        <DialogContent>
          <Box sx={{ position: "relative" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={"https://f.ptcdn.info/762/058/000/pc91rhf9olTmLDj35rR-s.jpg"}
              alt="slip"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Refer id"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Price"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
             
                label="Age"
            
              >
                <MenuItem value={10}>Wrong Image</MenuItem>
                <MenuItem value={20}>Invalid Price</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button variant="contained" onClick={handleClose}>
                Submit
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box> */}
          <FormVerifiedOrder
            initialValues={{
              referId: slip?.referId || "",
              price: slip?.price || "",
              status: "",
            }}
            dropdownOptions={[
              { key: "", value: "" },
              { key: "Invalid Slip Image", value: "INVALID_SLIP" },
            ]}
            onSubmit={(values) => {
              console.log(values);
              verifiedSlip({ orderId, slipId, body: values });
              handleClose();
            }}
            handleClose={handleClose}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
