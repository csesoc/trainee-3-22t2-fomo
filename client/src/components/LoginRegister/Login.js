import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Button, Alert } from "@mui/material";
import styles from "./Login.module.css";
import { BsFillEyeFill } from "react-icons/bs";
import env from "react-dotenv";

const Login = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const toggleVisibility = (e) => {
    const password = document.getElementById(e.currentTarget.dataset.name);
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.post("/login", {
        username: inputs.username,
        password: inputs.password,
      });
      setAuth({ accessToken: res.data.accessToken });
      setInputs({ username: "", password: "" });
      navigate("/admin", { replace: true });
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className={styles.container}>
      {/*LOGIN TITLE*/}
      <h1 className={styles.headerText}>Login</h1>
      {/*INPUT BARS*/}
      <div className={styles.input}>
        {/* INCORRECT PASSWORD/USER */}
        <Alert
          severity="error"
          sx={{ display: success ? "none" : "flex", mt: "5%" }}
        >
          The username or password is incorrect.{" "}
          <a href={env.FOMO_URL + "/resetpasswordreq"}>Forgot Password</a>
        </Alert>
        {/*USERNAME INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Username / Email</h3>
          <input
            name="username"
            className={styles.inputBar}
            type="text"
            value={inputs.username}
            onChange={handleChange}
            required
          />
        </div>
        {/*PASSWORD INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Password</h3>
          <div className={styles.passwordBarWrapper}>
            <input
              name="password"
              className={styles.inputBar}
              type="password"
              value={inputs.password}
              id="password"
              onChange={handleChange}
              required
            />
            <BsFillEyeFill
              className={styles.eyeIcon}
              data-name="password"
              onClick={toggleVisibility}
            />
          </div>
        </div>
      </div>
      {/*BUTTON*/}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: "5%", backgroundColor: "#40E317" }}
      >
        LOGIN
      </Button>
      {/*TEXT AT BOTTOM*/}
      <div className={styles.registerText}>
        <p className={styles.regisText}>
          Or <a href={env.FOMO_URL + "/register"}>Create Your Account</a> now to
          build your own personalised calendar!
        </p>
      </div>
    </form>
  );
};

export default Login;
