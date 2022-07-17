import mainlogo from '../mainlogo.png' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimeline } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FaInfo } from "react-icons/fa" 
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
        <li> <FontAwesomeIcon icon={faTimeline} /> </li>
        <li> <FontAwesomeIcon icon={faGear} /> </li>
      </ul>
      <InfoButton trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h5>fo mo no longer</h5>
      </InfoButton>
    </div>
  )
}

 
export default FrontGeneral