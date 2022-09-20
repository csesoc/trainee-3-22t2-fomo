import { FaInfo } from "react-icons/fa"
import {useState} from 'react';
import {Button, Box, Dialog, DialogContent, DialogActions }  from "@mui/material"


const InfoButton = () => {  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};
 
  return (
    <div>
      <FaInfo className="close-btn" onClick={handleOpen} /> 
      <Dialog open={open} onClose={handleClose}> 
      
      <div className='info-block'>
        <DialogActions>
          <Button style={{'color':'green'}}onClick={handleClose}>X</Button> 
        </DialogActions> 
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '30px' }}>  
            <div className='info-info'>  
              <h1>FOMO</h1> 
              <h4>♡ Never let your bad organisation skills make you feel fomo again ♡</h4>   
              < br/>
              <h3>How to Use</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis in eu mi bibendum neque egestas congue quisque egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elit sed vulputate mi sit amet. Leo duis ut diam quam nulla porttitor massa id. Sit amet est placerat in egestas. Vitae congue eu consequat ac felis donec. Elit scelerisque mauris pellentesque pulvinar. Fermentum iaculis eu non diam phasellus. Dis parturient montes nascetur ridiculus mus mauris. Integer eget aliquet nibh praesent tristique magna. Cursus euismod quis viverra nibh. Elementum nisi quis eleifend quam adipiscing.</p>
                    <br/> 
                    <h3 style={{"textAlign": "center"}}>Creators</h3> 
                    <ul className="creators">
                      <li>Henry</li> 
                      <li>Theo</li>
                      <li>Nathan</li>
                      <li>Sofia</li>
                      <li>Jasmine</li>
                    </ul> 
            </div>
          </Box>
        </DialogContent> 
      </div>
    </Dialog>
    </div>
  )
} 

export default InfoButton


