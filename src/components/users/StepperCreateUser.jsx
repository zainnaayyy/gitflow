import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonalForm from "./create_user/PersonalForm";
import AddressForm from "./create_user/AddressForm";
import SettingsForm from "./create_user/SettingsForm";
import ThanksForm from "./create_user/ThanksForm";

import Steps from "./create_user/Steps";

//Hooks
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

//RTK
import { useAddUsersMutation } from "../../features/users/userApiSlice";
import { Button } from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";

const formTemplate = {
  username: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  date_of_birth: "",
  gender: "",
  language: "",

  address: "",
  city: "",
  state: "",
  zip_code: "",
  
  user_type: "",

};

export const StepperCreateUser = () => {
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const [createUser, { isLoading }] = useAddUsersMutation();

  const formComponents = [
    <PersonalForm data={data} updateFieldHandler={updateFieldHandler} />,
    <AddressForm data={data} updateFieldHandler={updateFieldHandler} />,
    <SettingsForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ThanksForm data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  const changeStepFunc = (e) => {
    changeStep(currentStep + 1, e);
    console.log("e:", e);
  };

  // GAMBIARRA PARA REMOVER OS CAMPOS ADDRESS E QUE NÃO IREMOS UTILIZAR A PRINCIPIO.
  const user_data = {
    username: data.username,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    email: data.email,
    // date_of_birth: data.date_of_birth,
    password: "trace999",
    // gender: data.gender,
    language: data.language,

    address: data.address,
    city: data.city,
    state: data.state,
    zip_code: data.zip_code,
  };

  const submitForm = () => {
    console.log("data:", data);

    createUser(user_data);
  };

  return (
    <div>
      <div className="app">
        <div className="form-container">
          <Steps currentStep={currentStep} />
          <form onSubmit={changeStepFunc}>
            <div className="inputs-container">{currentComponent}</div>
            <div className="actions">
              {!isFirstStep && (
                <Button
                  onClick={() => changeStep(currentStep - 1)}
                  type="button"
                  size="small"
                  sx={{
                    backgroundColor: "#a82828",
                    width: "20%",
                    height: "32px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                    float: "left",
                  }}
                  className="btn-back"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "16px", ml: 1 }} />
                  <span sx={{ color: "#ffffff", fontSize: "22px" }}>Back</span>
                </Button>
              )}
              {!isLastStep ? (
                <Button
                  type="submit"
                  size="small"
                  sx={{
                    backgroundColor: "#0e8e5f",
                    width: "20%",
                    height: "32px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                    float: "right",
                  }}
                  className="btn-connect"
                >
                  <span sx={{ color: "#ffffff", fontSize: "22px" }}>Next</span>
                  <ArrowForwardIosIcon sx={{ fontSize: "16px", ml: 1 }} />
                </Button>
              ) : (
                <Button
                  onClick={submitForm}
                  type="submit"
                  size="small"
                  sx={{
                    backgroundColor: "#0e8e5f",
                    width: "20%",
                    height: "32px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                    float: "right",
                  }}
                  className="btn-connect"
                >
                  <span sx={{ color: "#ffffff", fontSize: "22px" }}>Send</span>
                  <CheckOutlined sx={{ fontSize: "16px", ml: 1 }} />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
