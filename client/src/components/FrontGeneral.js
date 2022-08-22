import mainlogo from '../mainlogo.png' 

import { FaInfo, FaBars } from "react-icons/fa"
import EventAdd from './EventAdd';
import LoginIcon from './LoginRegister/LoginIcon';
import Profile from './LoginRegister/Profile';
import './FrontGeneral.css'
import { useState } from 'react'; 

import InfoButton from './InfoButton';
import ChangeLogButton from './ChangeLogButton';


const FrontGeneral = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul>
          <li> <EventAdd /> </li>
          <li> <FaInfo onClick={()=>setButtonPopup(true)}/> </li>
          <InfoButton trigger={buttonPopup} setTrigger={setButtonPopup}>
            
            
          </InfoButton>
          
          <li> <FaBars onClick={()=>setButtonPopup2(true)}/> </li>
          <ChangeLogButton trigger={buttonPopup2} setTrigger={setButtonPopup2}> 
          </ChangeLogButton>

          <li> <LoginIcon /> </li>
        </ul>
       
      </div> 
      <Profile />
    </div>
  )
}

 
export default FrontGeneral