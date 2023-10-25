import React, { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  useTheme,
  Grid,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../components/Header";
import * as Yup from "yup";
import "./Wizard.css";

import { AccountCircle, Email, LocationOn } from "@mui/icons-material";

const steps = [
  {
    id: 1,
    label: "Step 1",
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    }),
    icon: <AccountCircle />,
  },
  {
    id: 2,
    label: "Step 2",
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    icon: <Email />,
  },
  {
    id: 3,
    label: "Step 3",
    validationSchema: Yup.object({
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      creditCardNumber: Yup.string().required("Required"),
      expiryDate: Yup.string().required("Required"),
      cvv: Yup.string().required("Required"),
    }),
    icon: <LocationOn />,
  },
];

const Wizard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (values) => {
    console.log(values); // Handle form submission
    setStep(1); // Reset to the first step after submission
  };

  return (
    <Box className="wizard-container" m="20px">
      <Header title="Leads" subtitle="Manage Leads" />
      <Box>
        <Box>
          <Box>
            <Typography variant="h3" color={colors.grey[200]}>
              Lead Wizard
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={2} md={8}>
            <Stepper activeStep={step - 1}>
              {steps.map((stepItem) => (
                <Step key={stepItem.id}>
                  <StepLabel
                    StepIconComponent={() => (
                      <div
                        className={`step-icon ${
                          step === stepItem.id ? "active" : ""
                        }`}
                      >
                        {stepItem.icon}
                      </div>
                    )}
                  >
                    {stepItem.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                phoneNumber: "",
                creditCardNumber: "",
                expiryDate: "",
                cvv: "",
              }}
              validationSchema={steps[step - 1].validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form>
                  <Box
                    className="step-content"
                    display={step === 1 ? "block" : "none"}
                  >
                    <Typography variant="h6">Step 1</Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          fullWidth
                        />
                        <ErrorMessage name="firstName" component="div" />
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                        <Field
                          name="middleName"
                          type="text"
                          placeholder="Middle Name"
                          fullWidth
                        />
                        <ErrorMessage name="middleName" component="div" />
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          fullWidth
                        />
                        <ErrorMessage name="lastName" component="div" />
                      </Grid>
                    </Grid>

                  </Box>
                  <Box
                    className="step-content"
                    display={step === 2 ? "block" : "none"}
                  >
                    <Typography variant="h6">Step 2</Typography>
                    <Field name="email" type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" />
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </Box>

                  <Box
                    className="step-content"
                    display={step === 3 ? "block" : "none"}
                  >
                    <Typography variant="h6">Step 3</Typography>
                    <Field name="address" type="text" placeholder="Address" />
                    <ErrorMessage name="address" component="div" />
                    <Field name="city" type="text" placeholder="City" />
                    <ErrorMessage name="city" component="div" />
                    <Field name="state" type="text" placeholder="State" />
                    <ErrorMessage name="state" component="div" />
                    <Field name="zip" type="text" placeholder="Zip" />
                    <ErrorMessage name="zip" component="div" />
                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" />
                    <Field
                      name="creditCardNumber"
                      type="text"
                      placeholder="Credit Card Number"
                    />
                    <ErrorMessage name="creditCardNumber" component="div" />
                    <Field
                      name="expiryDate"
                      type="text"
                      placeholder="Expiry Date"
                    />
                    <ErrorMessage name="expiryDate" component="div" />
                    <Field name="cvv" type="text" placeholder="CVV" />
                    <ErrorMessage name="cvv" component="div" />
                  </Box>

                  <Box className="step-buttons" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={step === 1}
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                    {step < steps.length ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Wizard;
