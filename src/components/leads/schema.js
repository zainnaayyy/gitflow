import * as yup from "yup";

export const LeadSchema = yop.object().shape({
  first_name: yup
    .string()
    .min(3, "Can't have less than 2 characters")
    .required("Required"),
  middle_name: yup.string().min(3, "Can't have less than 2 characters"),
  last_name: yup
    .string()
    .min(3, "Can't have less than 2 characters")
    .required("Required"),
});
