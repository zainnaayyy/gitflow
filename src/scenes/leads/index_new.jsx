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
import "./Wizard.css";
import { CustomerVerification } from "./schema";

import { AccountCircle, Email, LocationOn } from "@mui/icons-material";

const initialValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: "",
  phone_number_2: "",
  date_of_birth: "",
  email: "",

  address: "",
  city: "",
  state: "",
  zip: "",

  weight: "",
  height: "",
  marital_status: "",
  veteran: "",
}


const steps = [
  {
    id: 1,
    label: "Step 1",
    validationSchema: CustomerVerification.profile,
    icon: <AccountCircle />,
  },
  {
    id: 2,
    label: "Step 2",
    validationSchema: CustomerVerification.address,
    icon: <LocationOn />,
  },
  {
    id: 3,
    label: "Step 3",
    validationSchema: CustomerVerification.additionalInfo,
    icon: <Email />,
  },
];

const fieldStyles = {
  width: '80%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '10px',
};

const errorStyles = {
  color: 'red',
  fontSize: '12px',
  marginTop: '-10px',
};

const Wizard = () => {
  const [formValues , setFormvalues] = useState(initialValues)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const handlePrevious = () => {
    setStep((step) => step - 1);
  };

  const handleSubmit = (values) => {
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
              initialValues={formValues}
              validationSchema={steps[step - 1].validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched, isSubmitting, setErrors, setTouched, resetForm }) => {
              return(
                
                <Form>
                  <Box
                    className="step-content"
                    display={step === 1 ? "block" : "none"}
                  >
                    <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3}}>Customer Profile Information</Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="first_name">First Name</label>
                        <Field
                          name="first_name"
                          type="text"
                          placeholder="John"
                          value={values.first_name}
                          style={fieldStyles}
                          onChange = {handleChange}
                          />
                        {errors.first_name && touched.first_name  && <p style={errorStyles}>{errors.first_name}</p>}
                        
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="middle_name">Middle Name</label>
                        <Field
                          name="middle_name"
                          type="text"
                          placeholder="Middley"
                          style={fieldStyles}
                          value={values.middle_name}
                          onChange={handleChange}
                        />
                        
                        {errors.middle_name && touched.middle_name && <p style={errorStyles}>{errors.middle_name}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="last_name">Last Name</label>
                        <Field
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                          style={fieldStyles}
                          value={values.last_name}
                          onChange={handleChange}
                        />
                        
                        {errors.last_name && touched.last_name  && <p style={errorStyles}>{errors.last_name}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="phone_number">Phone Number</label>
                        <Field
                          name="phone_number"
                          type="phone_number"
                          placeholder="Phone Number"
                          style={fieldStyles}
                          value={values.phone_number}
                          onChange={handleChange}
                        />
                        {errors.phone_number && touched.phone_number  && <p style={errorStyles}>{errors.phone_number}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="phone_number_2">Phone Number 2</label>
                        <Field
                          name="phone_number_2"
                          type="text"
                          placeholder="Phone Number 2"
                          style={fieldStyles}
                          value={values.phone_number_2}
                          onChange={handleChange}
                        />
                        {errors.phone_number_2 && touched.phone_number_2  && <p style={errorStyles}>{errors.phone_number_2}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="date_of_birth">Date of Birth</label>
                        <Field
                          name="date_of_birth"
                          type="text"
                          placeholder="Date of Birth"
                          style={fieldStyles}
                          value={values.date_of_birth}
                          onChange={handleChange}
                          
                        />
                        {errors.date_of_birth && touched.date_of_birth  && <p style={errorStyles}>{errors.date_of_birth}</p>}
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    className="step-content"
                    display={step === 2 ? "block" : "none"}
                  >
                  <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3}}>Customer Address</Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="address">Address testing</label>
                        <Field
                          name="address"
                          type="text"
                          placeholder="1st Street SE"
                          style={fieldStyles}
                          value={values.address}
                          onChange={handleChange}
                        />
                        {errors.address && touched.address && <p style={errorStyles}>{errors.address}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="city">City</label>
                        <Field
                          name="city"
                          type="text"
                          placeholder="Miami"
                          style={fieldStyles}
                          value={values.city}
                          onChange={handleChange}
                        />
                        {errors.city && touched.city  && <p style={errorStyles}>{errors.city}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="state">State</label>
                        <Field
                          name="state"
                          type="text"
                          placeholder="FL"
                          style={fieldStyles}
                          value={values.state}
                          onChange={handleChange}
                        />
                        {errors.state && touched.state  &&  <p style={errorStyles}>{errors.state}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="zip">ZIP</label>
                        <Field
                          name="zip"
                          type="text"
                          placeholder="John"
                          style={fieldStyles}
                          value={values.zip}
                          onChange={handleChange}
                        />
                        {errors.zip && touched.zip  && <p style={errorStyles}>{errors.zip}</p>}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    className="step-content"
                    display={step === 3 ? "block" : "none"}
                  >
                    <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3}}>Aditional Information</Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="weight">Weight</label>
                        <Field
                          name="weight"
                          type="text"
                          placeholder="Weight"
                          value={values.weight}
                          style={fieldStyles}
                          onChange = {handleChange}
                          />
                        {errors.weight && touched.weight  &&  <p style={errorStyles}>{errors.weight}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="height">Height</label>
                        <Field
                          name="height"
                          type="text"
                          placeholder="Height"
                          style={fieldStyles}
                          value={values.height}
                          onChange={handleChange}
                        />
                        {errors.height && touched.height  &&  <p style={errorStyles}>{errors.height}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="marital_status">Marital Status</label>
                        <Field
                          name="marital_status"
                          type="text"
                          placeholder="Single"
                          style={fieldStyles}
                          value={values.marital_status}
                          onChange={handleChange}
                        />
                        {errors.marital_status && touched.marital_status  &&  <p style={errorStyles}>{errors.marital_status}</p>}
                      </Grid>
                      <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                      <label htmlFor="veteran">Veteran</label>
                        <Field
                          name="veteran"
                          type="text"
                          placeholder="Veteran"
                          style={fieldStyles}
                          value={values.veteran}
                          onChange={handleChange}
                        />
                        {errors.veteran && touched.veteran  &&  <p style={errorStyles}>{errors.veteran}</p>}
                      </Grid>
                    </Grid>

                  </Box>
                  <Box className="step-buttons" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={step === 1}
                      onClick={
                        () => {
                          handlePrevious()
                          setTouched({})
                        }
                      }
                    >
                      Previous
                    </Button>
                    {step < steps.length ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleNext()
                          setTouched({})
                          setErrors({})
                        }}
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
              )}}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Wizard;