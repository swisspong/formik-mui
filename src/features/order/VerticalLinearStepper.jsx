import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useUpdateOrderStatusMutation } from "./orderApiSlice";

const steps = (orderId, updateOrderStatus) => [
  {
    label: "Attach Slip",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Verified Slip",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
      nextHandler: () => {
        updateOrderStatus({ orderId, body: { status: "PACKING" } });
      },
  },
  {
    label: "Packing",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,

    nextHandler: () => {
      updateOrderStatus({ orderId, body: { status: "DELIVERED" } });
    },
  },

  {
    label: "Delivered",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper({ orderId, stepCount = 0 }) {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [activeStep, setActiveStep] = React.useState(stepCount);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps(orderId, updateOrderStatus).map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      return step?.nextHandler
                        ? step.nextHandler()
                        : handleNext();
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps(orderId, updateOrderStatus).length - 1
                      ? "Finish"
                      : "Continue"}
                  </Button>
                  <Button
                    //disabled={index === 0}
                    disabled
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps(orderId, updateOrderStatus).length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
