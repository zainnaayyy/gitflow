import * as yup from "yup";

export const CustomerVerification = {
  profile: yup.object({
    first_name: yup.string().min(3, "Minimim of 3 chars").required("Required"),
    middle_name: yup.string().min(2, "Minimim of 2 chars"),
    last_name: yup.string().min(2, "Minimim of 2 chars").required("Required"),
    phone_number: yup
      .string()
      .min(12, "Minimim of 12 chars")
      .required("Required"),
    phone_number_2: yup.string().min(12, "Minimim of 2 chars"),
    date_of_birth: yup.string().required("Required"),
  }),
  address: yup.object({
    address: yup.string().min(3, "Minimim of 3 char").required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zip: yup.string().required("Required"),
  }),
  additionalInfo: yup.object({
    weight: yup.string().min(2, "Minimim of 2 char").required("Required"),
    height: yup.string().min(2, "Minimim of 2 char").required("Required"),
    marital_status: yup
      .string()
      .min(2, "Minimim of 2 char")
      .required("Required"),
    veteran: yup.string().required("Required"),
  }),
};
