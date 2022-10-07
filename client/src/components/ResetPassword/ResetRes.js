import { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./ResetRes.module.css";
import { BsFillEyeFill } from "react-icons/bs";
import env from "react-dotenv";

const ResetRes = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const params = useParams();

  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState("");
  const [inputs, setInputs] = useState({
    password: "",
    confirmpassword: "",
  });

  // change err mssg accordingly
  useEffect(() => {
    const alert = document.querySelector("#resetAlert");
    alert.innerHTML = err;
  }, [err]);

  const toggleVisibility = (e) => {
    const password = document.getElementById(e.currentTarget.dataset.name);
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmpassword) {
      setSuccess(false);
      setErr("The passwords entered below do not match. Please try again");
      return;
    }

    try {
      const res = await axiosPrivate.post("/resetpasswordres", {
        token: params.token,
        password: inputs.password,
      });
      setInputs({
        password: "",
        confirmpassword: "",
      });
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setErr(
        "The link has expired. Please visit&nbsp;" +
          '<a href="' +
          "/resetpasswordreq" +
          '">' +
          "here" +
          "</a>" +
          "&nbsp;to get a new one."
      );
    }
  };

  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className={styles.container}>
      {/*TITLE*/}
      <h1 className={styles.headerText}>Reset Password</h1>
      {/*TEXT*/}
      <div className={styles.registerText}>
        <p className={styles.regisText}>Enter your new password below</p>
      </div>
      {/*INPUT FORM - show based on success boolean*/}
      {!success && (
        <div className={styles.input}>
          {/* FAIL PASSWORD NOT MATCH MESSAGE */}
          <Alert
            id="resetAlert"
            severity="error"
            sx={{ display: success === false ? "flex" : "none", mt: "5%" }}
          ></Alert>
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
          {/*CONFIRM PASSWORD INPUT*/}
          <div className={styles.miniInput}>
            <h3 className={styles.inputText}>Confirm Password</h3>
            <div className={styles.passwordBarWrapper}>
              <input
                name="confirmpassword"
                className={styles.inputBar}
                type="password"
                value={inputs.confirmpassword}
                id="confirmpassword"
                onChange={handleChange}
                required
              />
              <BsFillEyeFill
                className={styles.eyeIcon}
                data-name="confirmpassword"
                onClick={toggleVisibility}
              />
            </div>
          </div>
          {/*BUTTON*/}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: "5%", backgroundColor: "#40E317" }}
          >
            UPDATE PASSWORD
          </Button>
        </div>
      )}
      {/* SUCCESS MESSAGE */}
      <Alert
        severity="success"
        sx={{ display: success ? "flex" : "none", mt: "5%" }}
      >
        Your password has been updated successfully. Click{" "}
        <a href={"/login"}>here</a> to Login again.
      </Alert>
    </form>
  );
};

export default ResetRes;
