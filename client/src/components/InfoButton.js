import { PopperUnstyled } from "@mui/base" 

function InfoButton(props) {
  return (props.trigger) ? (
    <div className="info-button">
      <div className="info-button-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}> close </button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default InfoButton
