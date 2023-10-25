import { ActionTypes } from "@mui/base";
import { Field, Form, Formik } from "formik";
import CustomCheckbox from "./CustomCheckbox";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { AdvancedSchema } from "./schema";

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('values:', values)
  actions.resetForm()
};

const AdvancedForm = () => {
  return (
    <Formik initialValues={{username: "", jobType: "", acceptedTos: false}} 
    validationSchema={AdvancedSchema}
    onSubmit={onSubmit}
    >
      {({isSubmitting}) => (
        <Form>
          <CustomInput 
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your Username"
          />
          <CustomSelect
            label="Job Type"
            name="jobType"
            placeholder="Select the Job"
          >
            <option value="">Please Select</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Agent">Agent</option>
          </CustomSelect>
          <CustomCheckbox type="checkbox" name="acceptedTos"/>
          <button disabled={isSubmitting} type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AdvancedForm;
