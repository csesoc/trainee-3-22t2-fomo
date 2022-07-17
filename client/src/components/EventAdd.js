import {useState} from 'react';
import {Button, Modal, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, FormControl, InputLabel, OutlinedInput, FormHelperText}  from "@mui/material"
import { flexbox } from '@mui/system';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaCalendarPlus } from 'react-icons/fa';
const titleStyle = {
  margin: '10px',
}


const EventAdd = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(new Date('2022-07-25T20:00:00'))

  const handleDateTimeChange = (newValue) => {
    setValue(newValue);
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
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl sx={{ m: 1, width: '47.25%'}}>
              <FormHelperText>Date</FormHelperText>
              <DesktopDatePicker 
              inputFormat="dd/MM/yyyy"
              value={value}
              onChange={handleDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              />
          </FormControl>
          <FormControl sx={{ m: 1, width: '47.25%'}}>
            <FormHelperText>Time</FormHelperText>
            <TimePicker
              value={value}
              onChange={handleDateTimeChange}
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
            maxRows={Infinity}
          />
        </FormControl>
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default EventAdd