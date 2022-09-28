import { useState } from 'react'
import { Button, Alert } from '@mui/material'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './Register.module.css'
import { BsFillEyeFill } from "react-icons/bs";

const Register = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const toggleVisibility = (e) => {
    const password = document.getElementById(e.currentTarget.dataset.name);
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await axiosPrivate.post('/register', {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email
      }) 
      setAuth({ accessToken: res.data.accessToken });
      setInputs({ 
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
      });
      navigate('/admin', { replace: true });
    } catch (err) {
      setSuccess(false);
    }
  }
    
  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className={styles.container}>
      {/*LOGIN TITLE*/}
      <h1 className={styles.headerText}>Register</h1>
      {/*TEXT AT BOTTOM*/}
      <div className={styles.registerText}>
          <p className={styles.regisText}>Fill in your details and start your own <a>personalised calendar</a> now!</p>
      </div>
      {/*INPUT FORM*/}
        {/* INCORRECT PASSWORD/USER */}
        <Alert severity='error' sx={{ display: success ? 'none': 'flex', mt: '5%' }}>
          Check if your passwords below match
        </Alert>
        {/*USERNAME INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Username</h3>
          <input name="username" className={styles.inputBar} type='text' 
          value={inputs.username} onChange={handleChange} required/>
        </div>
        {/*EMAIL INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Email</h3>
          <input name="email" className={styles.inputBar} type='text' 
          value={inputs.email} onChange={handleChange} required/>
        </div>
        {/*PASSWORD INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Password</h3>
          <div className={styles.passwordBarWrapper}>
            <input name="password" className={styles.inputBar} type='password' 
            value={inputs.password} id='password' onChange={handleChange} required/>
            <BsFillEyeFill className={styles.eyeIcon} data-name="password" onClick={toggleVisibility}/>
          </div>
        </div>
        {/*CONFIRM PASSWORD INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Confirm Password</h3>
          <div className={styles.passwordBarWrapper}>
            <input name="confirmpassword" className={styles.inputBar} type='password' 
            value={inputs.confirmpassword} id='confirmpassword' onChange={handleChange} required/>
            <BsFillEyeFill className={styles.eyeIcon} data-name="confirmpassword" onClick={toggleVisibility}/>
          </div>
        </div>
      {/*BUTTON*/}
      <Button type="submit" variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
          REGISTER
      </Button>
    </form>
  )
}

export default Register