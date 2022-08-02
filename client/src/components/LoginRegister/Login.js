import { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material'
import './Login.css'

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: inputs.username,
        password: inputs.password,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setAuth({ accessToken: data.accessToken });
      // Reset the username and password so they are no longer stored
      setInputs({username: '', password: ''});
      console.log(data);
      navigate("/admin", { replace: true });
    })
    .catch(err => {console.log(err)});
  }
    
  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className='container'>
      {/*LOGIN TITLE*/}
      <h1 className='headerText'>Login</h1>
      {/*INPUT BARS*/}
      <div className="input">
        {/*USERNAME INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Username</h3>
          <input name='username' className='inputBar' type='text'
          value={inputs.username} onChange={handleChange} />
        </div>
        {/*PASSWORD INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Password</h3>
          <input name='password' className='inputBar' type='text'
          value={inputs.password} onChange={handleChange} />
        </div>
      </div>
      {/*BUTTON*/}
      <Button type="submit" variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
          LOGIN
      </Button>
      {/*TEXT AT BOTTOM*/}
      <div className="registerText">
          <p className='regisText'>Or <a>Create Your Account</a> now to build your own personalised calendar!</p>
      </div>
    </form>
  )
}

export default Login