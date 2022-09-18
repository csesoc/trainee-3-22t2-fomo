import mainlogo from '../../mainlogo.png' 

import { FaInfo, FaClock } from "react-icons/fa"
import EventAdd from './EventAdd';
import LoginIcon from '../LoginRegister/LoginIcon';
import Profile from '../LoginRegister/Profile';
import './FrontGeneral.css'
import { useState } from 'react'; 
import InfoButton from './InfoButton';
import ChangeLogButton from '../NavBar/ChangeLogButton';
import Calendar from '../Calendar'; 


const FrontGeneral = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul>
          <li> <EventAdd /> </li>
          <li> <InfoButton /></li>
          
          <li> <FaClock onClick={() => setButtonPopup2(true)}/> </li>
          <ChangeLogButton trigger={buttonPopup2} setTrigger={setButtonPopup2}> 
          </ChangeLogButton>

          <li> <LoginIcon /> </li>
        </ul>
       
      </div> 
      <Profile />
      <Calendar />
    </div>
  )
}

 
export default FrontGeneral