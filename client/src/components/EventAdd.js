import {useState, useEffect} from 'react';
import {Button, Modal, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, FormControl, InputLabel, OutlinedInput, FormHelperText}  from "@mui/material"
import { flexbox } from '@mui/system';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaCalendarPlus } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
const titleStyle = {
  margin: '10px',
}


const EventAdd = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startTime, setStartTime] = useState(new Date('2022-07-25T20:00:00'));
  const [endTime, setEndTime] = useState(new Date('2022-07-25T20:00:00'));
  const [inputs, setInputs] = useState({
    eventName: '',
    description: '',
    societyId: ''
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleStartChange = (newTime) => {
    setStartTime(newTime);
  }

  const handleEndChange = (newTime) => {
    setEndTime(newTime)
  }

  const handleSubmit = async (e) => {
    try {
      const response = await axiosPrivate.post('/event/add', {
        // TODO: GET THE SOCIETYID FROM A SOCIETY THAT THE USER IS ACTUALLY A PART OF
        // TODO: ADD TAGS
        societyId: "62ff46bb7fd160728335e271",
        eventName: inputs.eventName,
        start: startTime.getTime(),
        end: endTime.getTime(),
        description: inputs.description,
        tags: []
      });
      console.log('success');
      handleClose();
    } catch (err) {
      console.log(err);
      console.log(inputs)
      if (err.response.status === 403 || err.response.status === 401) {
        navigate('/login');
      }
    }
  }


  return (
    <div>
      <FaCalendarPlus onClick={handleOpen} /> 
      <Dialog open={open} onClose={handleClose}>
      <h2 style={titleStyle}>Add Event</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <FormHelperText>Event Name</FormHelperText>
          <OutlinedInput
            placeholder="Event Name"
            name="eventName"
            onChange={handleChange}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl sx={{ m: 1, width: '47.25%'}}>
              <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartChange}
              renderInput={(params) => <TextField {...params} />}
              />
          </FormControl>
          <FormControl sx={{ m: 1, width: '47.25%'}}>
              <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndChange}
              renderInput={(params) => <TextField {...params} />}
              />
          </FormControl>
        </LocalizationProvider>
        <FormControl fullWidth sx={{ m: 1 }}>
          <FormHelperText>Description</FormHelperText>
          <TextField
            placeholder="Description"
            multiline
            rows={5}
            name="description"
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default EventAdd