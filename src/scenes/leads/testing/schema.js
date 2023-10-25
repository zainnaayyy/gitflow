import * as yup from "yup";

export const profileSchema = yup.object().shape({
  first_name: yup.string().min(3, "Mais de 3 caraaaio").required("Required"),
  middle_name: yup.string().min(2, "Mais de 2 caraaaio"),
  last_name: yup.string().min(3, "Mais de 3 caraaaio").required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  phone_number: yup.string().min(12, "Mais de 12 ").required("Required"),
  phone_number_2: yup.string().min(12, "Mais de 12 caraaaio"),
  date_of_birth: yup.string().min(3, "Mais de 12").required("Required"),
  // othes in minute 9:00
});

export const addressSchema = yup.object().shape({
  address: yup.string().min(3, "Mais de 3 caraaaio").required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zip: yup.string().required("Required"),
});

export const credentialsSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
