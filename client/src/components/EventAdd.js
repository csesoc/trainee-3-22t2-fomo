import {useState, useEffect} from 'react';
import {Button, Modal, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, FormControl, InputLabel, OutlinedInput, FormHelperText, Checkbox, FormControlLabel}  from "@mui/material"
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
  const handleOpen = () => {setOpen(true); setTags([])};
  const handleClose = () => {setOpen(false); setTags([]); console.log(inputs.description)};
  const [startTime, setStartTime] = useState(new Date('2022-07-25T20:00:00'));
  const [endTime, setEndTime] = useState(new Date('2022-07-25T20:00:00'));
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
          label="workshops"
          control={<Checkbox name="workshops" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="networking"
          control={<Checkbox name="networking" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="social"
          control={<Checkbox name="social" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="free food"
          control={<Checkbox name="free food" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="alchohol"
          control={<Checkbox name="alchohol" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="excursion"
          control={<Checkbox name="excursion" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="online"
          control={<Checkbox name="online" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="in-person"
          control={<Checkbox name="in-person" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="sports"
          control={<Checkbox name="sports" onClick={handleTagsChange}/>}
        />
        <FormControlLabel 
          sx={{ m: 1 }}
          label="education"
          control={<Checkbox name="education" onClick={handleTagsChange}/>}
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