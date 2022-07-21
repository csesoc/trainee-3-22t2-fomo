import React from 'react'
import { Button } from '@mui/material'
import './Register.css'

const Register = () => {
  return (
    // CONTAINER
    <form className='container'>
        {/*LOGIN TITLE*/}
        <h1 className='headerText'>Register</h1>
        {/*TEXT AT BOTTOM*/}
        <div className="registerText">
            <p className='regisText'>Fill in your details and start your own <a>personalised calendar</a> now!</p>
        </div>
        {/*INPUT BARS*/}
        <div className="inputDetails">
            {/*FIRST NAME INPUT*/}
            <div className="miniInput">
                <h3 className='inputText'>First Name</h3>
                <input className='inputDetailsBar' type='text' />
            </div>
            {/*LAST NAME INPUT*/}
            <div className="miniInput">
                <h3 className='inputText'>Last Name</h3>
                <input className='inputDetailsBar' type='text' />
            </div>
        </div>
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
            {/*CONFIRM PASSWORD INPUT*/}
            <div className="miniInput">
                <h3 className='inputText'>Confirm Password</h3>
                <input className='inputBar' type='text' />
            </div>
        </div>
        {/*BUTTON*/}
        <Button variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
            REGISTER
        </Button>
    </form>
  )
}

export default Register