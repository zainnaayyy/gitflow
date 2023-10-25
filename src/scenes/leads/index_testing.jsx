import { Box } from "@mui/system";
import React from "react";
import Header from "../../components/Header";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

const validate = (values) => {
  const errors = {};
  if(!values.first_name) {
    errors.first_name = 'Required';
  } else if(values.first_name.length < 5) {
    errors.first_name = 'Must be 5 characteres or less';
  } else if (values.first_name.length > 10) {
    errors.first_name = "can't be higher then 10 characters"
  }

  if (!values.last_name) {
    errors.last_name = "required";
  } else if(values.last_name.length < 5) {
    errors.last_name = "must be 5 characters or more"
  } else if (values.last_name.length > 10) {
    errors.last_name = "can't be higher then 10 characters"
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate
  });

  return (
    <Box className="wizard-container" m="20px">
      <Header title="Leads" subtitle="Manage Leads" />
      <Box>
        <Box>
          <Box>SignupForm</Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
          />
          {formik.touched.first_name && formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}
          </Grid>
          <Grid item xs={3}>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
          />
          {formik.touched.last_name && formik.errors.last_name ? <div>{formik.errors.last_name}</div> : null}
          </Grid>
          <Grid item xs={3}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </Grid>
        </Grid>
          <button type="submit">Submit</button>
        </form>
      </Box>
    </Box>
  );
};

export default SignupForm;

