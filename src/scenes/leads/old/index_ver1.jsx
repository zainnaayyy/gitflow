import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Wizard = () => {
  const [step, setStep] = useState(1);

  const initialValues = {
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
  };

  const validationSchema1 = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  });

  const validationSchema2 = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const validationSchema3 = Yup.object({
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    creditCardNumber: Yup.string().required("Required"),
    expiryDate: Yup.string().required("Required"),
    cvv: Yup.string().required("Required"),
  });

  return (
    <Box>
      <Box m="20px">
        <Header title="Leads" subtitle="Manage Leads" />
        <h1>Wizard</h1>
        {step === 1 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema1}
            onSubmit={() => setStep(2)}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Form>
                <h2>Step 1</h2>
                <Field name="firstName" type="text" placeholder="First Name" />
                {errors.firstName && touched.firstName && (
                  <div>{errors.firstName}</div>
                )}
                <Field name="lastName" type="text" placeholder="Last Name" />
                {errors.lastName && touched.lastName && (
                  <div>{errors.lastName}</div>
                )}
                <button type="submit" disabled={isSubmitting}>
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}
        {step === 2 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema2}
            onSubmit={() => setStep(3)}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Form>
                <h2>Step 2</h2>
                <Field name="email" type="email" placeholder="Email" />
                {errors.email && touched.email && <div>{errors.email}</div>}
                <Field name="password" type="password" placeholder="Password" />
                {errors.password && touched.password && (
                  <div>{errors.password}</div>
                )}
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div>{errors.confirmPassword}</div>
                )}
                <button type="submit" disabled={isSubmitting}>
                  Next
                </button>
              </Form>
            )}
          </Formik>
        )}
        {step === 3 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema3}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Form>
                <h2>Step 3</h2>
                <Field name="address" type="text" placeholder="Address" />
                {errors.address && touched.address && (
                  <div>{errors.address}</div>
                )}
                <Field name="city" type="text" placeholder="City" />
                {errors.city && touched.city && <div>{errors.city}</div>}
                <Field name="state" type="text" placeholder="State" />
                {errors.state && touched.state && <div>{errors.state}</div>}
                <Field name="zip" type="text" placeholder="Zip" />
                {errors.zip && touched.zip && <div>{errors.zip}</div>}
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div>{errors.phoneNumber}</div>
                )}
                <Field
                  name="creditCardNumber"
                  type="text"
                  placeholder="Credit Card Number"
                />
                {errors.creditCardNumber && touched.creditCardNumber && (
                  <div>{errors.creditCardNumber}</div>
                )}
                <Field
                  name="expiryDate"
                  type="text"
                  placeholder="Expiry Date"
                />
                {errors.expiryDate && touched.expiryDate && (
                  <div>{errors.expiryDate}</div>
                )}
                <Field name="cvv" type="text" placeholder="CVV" />
                {errors.cvv && touched.cvv && <div>{errors.cvv}</div>}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
};

export default Wizard;
