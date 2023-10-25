import * as yup from "yup";

export const TicketSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "title needs at least 5 characters")
    .required("Required"),
  description: yup.string().min(10),
  user: yup.string.oneOf(["put a list rtk here"]).required("Required"),
  select_category: yup.string
    .oneOf(["put a list rtk here"])
    .required("Required"),
});
