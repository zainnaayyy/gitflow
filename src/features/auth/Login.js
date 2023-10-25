import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import "./../../index.css";
import logoEhg from "../../assets/img/logo.png";
import { useAuth } from "../../shared";

const Login = () => {
  const { login, user } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [{ isLoading }] = useLoginMutation();
  // const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(username, password);
      dispatch(setCredentials({ ...userData, username }));
      setUsername("");
      setPassword("");
      navigate("/dashboard"); // {replace: true} - ADDED
    } catch (err) {
      if (!err?.originalStatus) {
        // is not getting the error message to provide in the frontend in case of 400 or 401, FIX IT !!
        // isLoading: true until timeout occurs

        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login flex-login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Box
        sx={{
          mt: 12,
          width: "25%",
          textAlign: "center",
          padding: "50px 20px",
          borderRadius: "20px",
        }}
      >
        <div className="head-card">
          <img
            src={logoEhg}
            alt="ehgcorp"
            style={{
              width: "200px",
              filter: `drop-shadow(1px 1px 1px #222)`,
            }}
          />

          <h1
            style={{
              fontSize: "24px",
            }}
          >
            Employee Login
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePwdInput}
            value={password}
            required
            className="margin-form"
          />
          <button sx={{}} className="margin-btn margin-form stl-btn-send">
            Sign In
          </button>
        </form>
      </Box>
    </section>
  );

  return content;
};
export default Login;
