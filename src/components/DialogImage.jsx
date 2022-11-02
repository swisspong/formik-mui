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
import { useEffect, useState } from "react";

export default function DialogImage({ orderId, slipId, slip }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [verifiedSlip] = useVerifiedSlipMutation();

  const [formState, setFormState] = useState({
    invalidSlip: slip?.invalidSlip || false,
    referId: slip?.referId || "",
    price: slip?.price || "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {slip?.verified === true ? "Verified Slip" : "Verify Slip"}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
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
          <FormVerifiedOrder
            initialValues={formState}
          
            data={slip || null}
            
            onSubmit={(values) => {
              console.log(values);
              verifiedSlip({ orderId, slipId, body: values });
              handleClose();
            }}
            handleClose={handleClose}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
