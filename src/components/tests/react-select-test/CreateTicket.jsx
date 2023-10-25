import { useFormik } from "formik";
import React from "react";

const CreateTicket = () => {
  const formik = useFormik({
    initialValues: {
      email: 'test@gmail.com',
    },
    onSubmit: (e) => {
      console.log("Typed:", e);
    },
  });

  return (

      <form onSubmit={formik.onSubmit}>
        <label htmlFor="email">Email Address</label>
        <input name="email" 
        id="email" 
        type="email" 
        onChange={formik.handleChange}
        value={formik.values.email}
        />
      </form>

  );
};

export default CreateTicket;
