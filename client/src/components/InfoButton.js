import { PopperUnstyled } from "@mui/base" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'

function InfoButton(props) {
  return (props.trigger) ? (
    <div className="info-button">
      <div className="info-button-inner">
        <FontAwesomeIcon icon={faX} className="close-btn" onClick={() => props.setTrigger(false)} /> 
        { props.children }
      </div>
    </div>
  ) : "";
}

export default InfoButton
