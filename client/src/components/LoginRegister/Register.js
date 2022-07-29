import { useState } from 'react'
import { Button } from '@mui/material'
import './Register.css'

const Register = () => {

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

  const handleSubmit = (e) => {

    e.preventDefault();
    if (inputs.password !== inputs.confirmpassword) {
      alert("Passwords not matching");
      return
    }

    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: inputs.username,
        password: inputs.password,
      })
    })
    .then((response) => response.json())
    .then((data) => {console.log(data)})
    .catch(err => {console.log(err)});
  }
    
  return (
    // CONTAINER
    <form onSubmit={handleSubmit} className='container'>
      {/*LOGIN TITLE*/}
      <h1 className='headerText'>Register</h1>
      {/*TEXT AT BOTTOM*/}
      <div className="registerText">
          <p className='regisText'>Fill in your details and start your own <a>personalised calendar</a> now!</p>
      </div>
      {/*INPUT FORM*/}
      <form className="input">
        {/*USERNAME INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Username</h3>
          <input name="username" className='inputBar' type='text' 
          value={inputs.username} onChange={handleChange} />
        </div>
        {/*EMAIL INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Email</h3>
          <input name="email" className='inputBar' type='text' 
          value={inputs.email} onChange={handleChange} />
        </div>
        {/*PASSWORD INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Password</h3>
          <input name="password" className='inputBar' type='text' 
          value={inputs.password} onChange={handleChange} />
        </div>
        {/*CONFIRM PASSWORD INPUT*/}
        <div className="miniInput">
          <h3 className='inputText'>Confirm Password</h3>
          <input name="confirmpassword" className='inputBar' type='text' 
          value={inputs.confirmpassword} onChange={handleChange} />
        </div>
      </form>
      {/*BUTTON*/}
      <Button type="submit" variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
          REGISTER
      </Button>
    </form>
  )
}

export default Register