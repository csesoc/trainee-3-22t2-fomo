import mainlogo from '../../mainlogo.png' 
import UserAdd from './UserAdd'
import EventAdd from './EventAdd';
import LoginIcon from '../LoginRegister/LoginIcon';
import Profile from '../LoginRegister/Profile';
import './FrontGeneral.css'
import InfoButton from './InfoButton'; 
import Calendar from '../Calendar'; 
import OppositeContentTimeline from './Timeline';


const FrontAdmin = () => {
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul>
          <li> <UserAdd /> </li>
          <li> <EventAdd /> </li>
          <li> <InfoButton /></li>
          <li> <OppositeContentTimeline /> </li>
          <li> <LoginIcon /> </li>
        </ul>
       
      </div> 
      <Profile />
      <Calendar />
    </div>
  )
}

 
export default FrontAdmin
