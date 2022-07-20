import mainlogo from '../mainlogo.png' 

import {FaInfo} from "react-icons/fa"
import {FaBars} from "react-icons/fa"
import EventAdd from './EventAdd';
import './FrontGeneral.css'

const FrontGeneral = () => {
  return (
    <div className='navBar'>
      <img className='logo' src={mainlogo} /> 
      <ul>
        <li> <EventAdd /> </li>
        <li> <FaInfo /> </li>
        <li> <FaBars /> </li>
      </ul>
    </div>
  )
}

 
export default FrontGeneral