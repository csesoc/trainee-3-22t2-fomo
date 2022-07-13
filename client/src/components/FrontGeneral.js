import mainlogo from '../mainlogo.png' 

import {FaInfo} from "react-icons/fa"
import {FaBars} from "react-icons/fa"
 
const FrontGeneral = () => {
  return (
    <div className='navBar'>
      <img className='logo' src={mainlogo} /> 
      <ul>
        <li> <a href="/info"><FaInfo /></a></li>
        <li> <a href="/setting"><FaBars /></a></li>
      </ul>
    </div>
  )
}

 
export default FrontGeneral