 
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import './Timeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaClock } from "react-icons/fa"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react';
import {Button, Modal, Typography, Box, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, FormControl, InputLabel, OutlinedInput, FormHelperText, Checkbox, FormControlLabel}  from "@mui/material"
import { flexbox } from '@mui/system';   
const titleStyle = {
  margin: '10px',
}


const OppositeContentTimeline = () => {  
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};
 
  return (
    <div>
      <FaClock className="close-btn" onClick={handleOpen} /> 
      <Dialog open={open} onClose={handleClose}> 
      
      <div className='change-log-block'>
      <DialogActions>
          <FontAwesomeIcon icon={faTimes} onClick={handleClose}>Cancel</FontAwesomeIcon> 
      </DialogActions>
      <h1>Change Log</h1>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '30px' }}>   

        <React.Fragment>
      <Timeline position="alternate" >

        <TimelineItem>
          <TimelineSeparator> 
            <TimelineDot className={"timeline_dot_header"}>{<LaptopMacIcon />}</TimelineDot>
            <TimelineConnector className={"timeline_line"} />
          </TimelineSeparator >
          <TimelineContent className={"timeline_content"}></TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_content"}>
            The Birth of Fomo
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"}/>
            <TimelineConnector className={"timeline_line"} />
          </TimelineSeparator >
          <TimelineContent className={"timeline_date"}>June 2022</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_date"}>
            July 2022
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={"timeline_content"}>Made it better</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_content"}>
            Made it even better
          </TimelineOppositeContent>
          <TimelineSeparator> 
          <TimelineDot variant="outlined" className={"timeline_dot"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={"timeline_date"}>August 2022</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_date"} >
            Now
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={"timeline_content"}>Made it even more better</TimelineContent>
        </TimelineItem>

      </Timeline>
    </React.Fragment>

        </Box>
         
      </div>
    </Dialog>
    </div>
  )
} 

export default OppositeContentTimeline

