import mainlogo from '../mainlogo.png' 

import {FaInfo, FaBars} from "react-icons/fa"
import EventAdd from './EventAdd';
import LoginIcon from './LoginRegister/LoginIcon';
import Profile from './LoginRegister/Profile';
import './FrontGeneral.css'
import { useState } from 'react'; 

import InfoButton from './InfoButton';

const FrontGeneral = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul>
          <li> <EventAdd /> </li>
          <li> <FaInfo onClick={()=>setButtonPopup(true)}/> </li>

          <InfoButton trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h1>FOMO</h1>
            <p>♡ Never let your bad organisation skills make you feel fomo again ♡</p>
          </InfoButton>
          
          <li> <FaBars /> </li>
          <li> <LoginIcon /> </li>
        </ul>
      </div>
      <Profile />
    </div>
  )
}

 
export default FrontGeneral