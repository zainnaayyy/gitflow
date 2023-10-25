import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup.string().email("Enter Valid EMAIL! "),
  username: yup.string().min(5, "Username needs at least 5 characters"),
  // othes in minute 9:00
});

export const AdvancedSchema = yup.object().shape({
  username: yup.string().min(3, "Enter Valid Username").required("Required"),
  jobType: yup
    .string()
    .oneOf(["Developer", "Manager", "Agent"])
    .required("Required"),
  acceptedTos: yup.boolean().oneOf([true]),
});
