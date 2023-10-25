import { Box } from "@mui/system";
import React from "react";
import Header from "../../components/Header";
import { useFormik } from "formik";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box className="wizard-container" m="20px">
      <Header title="Leads" subtitle="Manage Leads" />
      <Box>
        <Box>
          <Box>SignupForm</Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <button type="submit">Submit</button>
        </form>
      </Box>
    </Box>
  );
};

export default SignupForm;
