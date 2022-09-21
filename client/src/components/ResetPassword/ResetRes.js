import { useState } from 'react'
import { Button, Alert } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './ResetRes.module.css'

const ResetRes = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const params = useParams();

  const [success, setSuccess] = useState(null);
  const [inputs, setInputs] = useState({
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (inputs.password !== inputs.confirmpassword) {
      setSuccess(false);
      return;
    }

    try {
      const res = await axiosPrivate.post('/resetpasswordres', {
        token: params.token,
        password: inputs.password,
      }) 
      setInputs({
        password: '',
        confirmpassword: '',
      });
			setSuccess(true);
    } catch (err) {
      setSuccess(false);
      const msg = "The link has expired. Please visit&nbsp;" + '<a href="'+"http://localhost:3000/resetpasswordreq"+'">'+"here"+'</a>' + "&nbsp;to get a new one."
      document.getElementById("err").innerHTML = msg;
    }
  }
    
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
			{ !success && <div className={styles.input}> 
				{/* FAIL PASSWORD NOT MATCH MESSAGE */}
				<Alert id="err" severity='error' fullwidth sx={{ display: success === false ? 'flex': 'none', mt: '5%'}}>
					The passwords entered below do not match. Please try again
				</Alert>
        {/*PASSWORD INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Password</h3>
          <input name="password" className={styles.inputBar} type='text' 
          value={inputs.password} onChange={handleChange} />
        </div>
        {/*CONFIRM PASSWORD INPUT*/}
        <div className={styles.miniInput}>
          <h3 className={styles.inputText}>Confirm Password</h3>
          <input name="confirmpassword" className={styles.inputBar} type='text' 
          value={inputs.confirmpassword} onChange={handleChange} />
        </div>
				{/*BUTTON*/}
				<Button type="submit" variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
          UPDATE PASSWORD
      	</Button>
			</div> }
      {/* SUCCESS MESSAGE */}
			<Alert severity='success' fullwidth  sx={{ display: success ? 'flex': 'none', mt: '5%' }}>
				Your password has been updated successfully. Click <a href='http://localhost:3000/login'>here</a> to Login again.
			</Alert>
    </form>
  )
}

export default ResetRes