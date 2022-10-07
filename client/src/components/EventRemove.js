import {useState} from 'react';
import {Button, Box, Dialog, DialogContent, DialogActions }  from "@mui/material"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const EventRemove = ({eventId}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};

 
  const deleteEvent = async (e) => {
    try {
      const response = await axiosPrivate.post("/event/del", {eventId: eventId });
      console.log("success");
      handleClose();
    } catch (err) {
      if (err.response.status === 403 || err.response.status === 401) {
        navigate("/login");
      }
    }
  } 

  return (
    <div> 

      <Button color="error" size="small" startIcon={<DeleteIcon />} onClick={handleOpen}>Delete</Button> 
      <Dialog open={open} onClose={handleClose}>
       
        <DialogContent>
          <Box sx={{ display: 'inline-block', flexWrap: 'wrap', padding: '30px' }}>  
            <h2>Are you sure?</h2>
            <DialogActions>
              <Button color="error" startIcon={<ThumbDownIcon/>} onClick={handleClose} />
              <Button color="success" startIcon={<ThumbUpIcon/>} onClick={deleteEvent} />
            </DialogActions> 
          </Box>
        </DialogContent> 
      </Dialog>
    </div>
  )
}

export default EventRemove