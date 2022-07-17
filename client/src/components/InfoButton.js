import { PopperUnstyled } from "@mui/base" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function InfoButton(props) {
  return (props.trigger) ? (
    <div className="info-button">
      <div className="info-button-inner">
        <FontAwesomeIcon icon={faTimes} className="close-btn" onClick={() => props.setTrigger(false)} /> 
        { props.children }
      </div>
    </div>
  ) : "";
}

export default InfoButton
