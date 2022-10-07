import { useState } from "react";
import { Button, Alert } from "@mui/material";
import styles from "./ResetReq.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import env from "react-dotenv";
const ResetReq = () => {
  const axiosPrivate = useAxiosPrivate();
  const [success, setSuccess] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.post("/resetpasswordreq", {
        email: inputs.email,
      });
      setInputs({ email: "" });
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className={styles.container}>
      {/*LOGIN TITLE*/}
      <h1 className={styles.headerText}>Reset Password</h1>
      {/* INSTRUCTIONS */}
      <div className={styles.instructions}>
        <p className={styles.instructionsText}>
          To reset your password, enter your email below and submit. An email
          will be sent to you with instructions about how to complete the
          process.
        </p>
      </div>
      {/*INPUT - show based on success boolean*/}
      {!success && (
        <div className={styles.input}>
          {/* FAIL EMAIL NOT FOUND MESSAGE */}
          <Alert
            severity="error"
            sx={{ display: success === false ? "flex" : "none" }}
          >
            The given email is not associated with any account yet.{" "}
            <a href={"/register"}>Sign Up</a> instead?
          </Alert>
          {/*EMAIL INPUT*/}
          <div className={styles.miniInput}>
            <h3 className={styles.inputText}>Email Address</h3>
            <input
              name="email"
              className={styles.inputBar}
              type="text"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          {/*BUTTON*/}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: "5%", backgroundColor: "#40E317" }}
          >
            SUBMIT
          </Button>
        </div>
      )}
      {/* SUCCESS MESSAGE */}
      <Alert
        severity="success"
        sx={{ display: success ? "flex" : "none", mt: "5%" }}
      >
        Please check your email inbox for further instructions to reset your
        password
      </Alert>
    </form>
  );
};

export default ResetReq;
