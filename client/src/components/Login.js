import React from 'react'
import { Button } from '@mui/material'
import './Login.css'

const Login = () => {
  return (
    // CONTAINER
    <form className='container'>
        {/*LOGIN TITLE*/}
        <h1 className='headerText'>Login</h1>
        {/*INPUT BARS*/}
        <div className="input">
            {/*EMAIL INPUT*/}
            <div className="miniInput">
                <h3 className='inputText'>Email</h3>
                <input className='inputBar' type='text' />
            </div>
            {/*PASSWORD INPUT*/}
            <div className="miniInput">
                <h3 className='inputText'>Password</h3>
                <input className='inputBar' type='text' />
            </div>
        </div>
        {/*BUTTON*/}
        <Button variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
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