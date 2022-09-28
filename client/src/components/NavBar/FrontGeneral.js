import mainlogo from '../../mainlogo.png' 
import LoginIcon from '../LoginRegister/LoginIcon';
import Profile from '../LoginRegister/Profile';
import './FrontGeneral.css'
import InfoButton from './InfoButton'; 
import Calendar from '../Calendar'; 
import OppositeContentTimeline from './Timeline';


const FrontGeneral = () => {
  return (
    <div>
      <div className='navBar'>
        <img className='logo' src={mainlogo} /> 
        <ul> 
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

 
export default FrontGeneral