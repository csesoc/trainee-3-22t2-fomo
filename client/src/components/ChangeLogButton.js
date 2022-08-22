import { PopperUnstyled } from "@mui/base" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function ChangeLogButton(props) {
  return (props.trigger) ? (
    <div className="change-log-button">
      <div className="change-log-button-inner">
        <FontAwesomeIcon icon={faTimes} className="close-btn" onClick={() => props.setTrigger(false)} /> 
        { props.children }
      </div>
    </div>
  ) : "";
}

export default ChangeLogButton