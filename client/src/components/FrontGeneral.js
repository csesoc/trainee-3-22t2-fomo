import mainlogo from '../mainlogo.png' 

import { FaInfo } from "react-icons/fa"
import { FaScroll } from "react-icons/fa"
import EventAdd from './EventAdd';
import InfoButton from './InfoButton';
import './FrontGeneral.css'
import { useState } from 'react';

const FrontGeneral = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className='navBar'>
      <img className='logo' src={mainlogo} /> 
      <ul>
        <li> <EventAdd /> </li>
        <li> <FaInfo onClick={() => setButtonPopup(true)}/> </li>
        <li> <FaScroll /> </li>
      </ul>
      <InfoButton trigger={buttonPopup} setTrigger={setButtonPopup}/>
    </div>
  )
}

 
export default FrontGeneral