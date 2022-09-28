import {useState, useEffect} from 'react';
import {Button, Modal, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, FormControl, InputLabel, OutlinedInput, FormHelperText, Checkbox, FormControlLabel}  from "@mui/material"
import { flexbox } from '@mui/system';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaCalendarPlus } from 'react-icons/fa';
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
const titleStyle = {
  margin: '10px',
}


const EventAdd = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true); setTags([])};
  const handleClose = () => {setOpen(false); setTags([]); console.log(inputs.description)};
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [dateError, setDateError] = useState(false);
  const [tags, setTags] = useState([]);
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
    if (startTime.getTime() <= endTime.getTime()) {
      setDateError(false);
      console.log('set error false');
    } else {
      setDateError(true);
    }
  }

  const handleEndChange = (newTime) => {
    setEndTime(newTime);
    if (startTime.getTime() <= endTime.getTime()) {
      setDateError(false);
      console.log('set error false');
    } else {
      setDateError(true);
    }
  }

  const handleDateError = (bool) => {
    setDateError(bool);
    console.log('set error ' + bool);
  }

  const handleTagsChange = (e) => {
    let tagName = e.target.name;
    let newTags = [...tags];
    if (newTags.includes(tagName)) {
      let tagIndex = newTags.findIndex((tag) => tag === tagName);
      newTags.splice(tagIndex, 1);
    } else {
      newTags.push(tagName)
    }
    setTags(newTags);
    console.log(tags)
  }

  const handleSubmit = async (e) => {
    try {
      const response = await axiosPrivate.post('/event/add', {
        // TODO: GET THE SOCIETYID FROM A SOCIETY THAT THE USER IS ACTUALLY A PART OF
        societyId: "62ff46bb7fd160728335e271",
        eventName: inputs.eventName,
        start: startTime.getTime(),
        end: endTime.getTime(),
        description: inputs.description,
        tags: tags
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '30px' }}>
        <h2 style={titleStyle}>Add Event</h2>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Event Name"
            placeholder="Event Name"
            name="eventName"
            onChange={handleChange}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl sx={{ m: 1, width: '46.95%'}}>
              <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartChange}
              renderInput={(params) => <TextField {...params} />}
              disablePast={true}
              error={true}
              />
          </FormControl>
          <FormControl sx={{ m: 1, width: '46.95%'}}>
            <DateTimePicker
            label="End Time"
            value={endTime}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} />}
            minDate={startTime}
            disablePast={true}
            onError= {() => {handleDateError(true)}}
            />
            { dateError ? <FormHelperText error={dateError}>End date is before start date</FormHelperText> : null}
          </FormControl>
        </LocalizationProvider>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows={5}
            name="description"
            onChange={handleChange}
          />
        </FormControl>
        {/* There's gotta be a better way to do this bit */}
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Workshop"
          control={<Checkbox name="Workshop" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Networking"
          control={<Checkbox name="Networking" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Social"
          control={<Checkbox name="Social" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Free Food"
          control={<Checkbox name="Free Food" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Alcohol"
          control={<Checkbox name="Alcohol" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Excursion"
          control={<Checkbox name="Excursion" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Online"
          control={<Checkbox name="Online" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="In-person"
          control={<Checkbox name="In-person" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Sports"
          control={<Checkbox name="Sports" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="Education"
          control={<Checkbox name="Education" onClick={handleTagsChange}/>}
        />
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {(dateError === false && inputs.eventName !== '') ? <Button onClick={handleSubmit}>Add</Button>: <Button disabled={true}>Add</Button>}
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default EventAdd