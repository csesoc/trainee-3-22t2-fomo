import mainlogo from '../mainlogo.png' 

import {FaInfo, FaBars} from "react-icons/fa"
import EventAdd from './EventAdd';
import LoginIcon from './LoginRegister/LoginIcon';
import Profile from './LoginRegister/Profile';
import './FrontGeneral.css'
import { useState } from 'react'; 

const FrontGeneral = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul>
          <li> <EventAdd /> </li>
          <li> <FaInfo /> </li>
          <li> <FaBars /> </li>
          <li> <LoginIcon /> </li>
        </ul>
      </div>
      <Profile />
    </div>
  )
}

 
export default FrontGeneral