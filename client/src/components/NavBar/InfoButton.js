import { PopperUnstyled } from "@mui/base" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function InfoButton(props) {
  return (props.trigger) ? (
    <div className="info-button">
      <div className="info-button-inner">
        <FontAwesomeIcon icon={faTimes} className="close-btn" onClick={() => props.setTrigger(false)} /> 
        { props.children }
        <div className='scroll-bg'>
            <div className='scroll-div'> 
              <h1>FOMO</h1>
              <br />
              <p>♡ Never let your bad organisation skills make you feel fomo again ♡</p>
              <br />
              <h3>How to Use</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
              <br/>
              <div className="creators">
                <h3>Creators</h3>
                <ul>
                  <li>Henry</li> 
                  <li>Theo</li>
                  <li>Nathan</li>
                  <li>Sofia</li>
                  <li>Jasmine</li>
                </ul>
              
              </div>
              <br/>
              <br/>
                
            </div>
          </div>
      </div>
    </div>
  ) : "";
}

export default InfoButton
