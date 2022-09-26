import {useState} from 'react';
import {Button, Box, Dialog, DialogContent, DialogActions }  from "@mui/material"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa"
const titleStyle = {
  margin: '10px',
}


const EventAdd = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate(); 

  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};
 

  return (
    <div> 

      <Button onClick={handleOpen}>Delete</Button> 
      <Dialog open={open} onClose={handleClose}>
       
        <DialogContent>
          <Box sx={{ display: 'inline-block', flexWrap: 'wrap', padding: '20px' }}>  
            <h2>Are you sure?</h2>
            <DialogActions>
              <Button style={{'color':'green', fontSize:40}}onClick={handleClose}>✗</Button>
              <Button style={{'color':'green', fontSize:40}}onClick={handleClose}>✓</Button> 
            </DialogActions> 
          </Box>
        </DialogContent> 
      </Dialog>
    </div>
  )
}

export default EventAdd