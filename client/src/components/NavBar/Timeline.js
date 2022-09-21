 
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
import { FaClock } from "react-icons/fa" 
import {useState} from 'react';
import {Button, Box, Dialog, DialogActions}  from "@mui/material"


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
        <Button style={{'color':'green'}}onClick={handleClose}>X</Button> 
      </DialogActions>
      <h1>Change Log</h1>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '30px', paddingTop:'0px'}}>   

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
            Ready to use
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"}/>
            <TimelineConnector className={"timeline_line"} />
          </TimelineSeparator >
          <TimelineContent className={"timeline_date"}>Now</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_date"}>
            August 2022
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={"timeline_content"}>Added Calendar</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_content"}>
            Decided on colour theme
          </TimelineOppositeContent>
          <TimelineSeparator> 
          <TimelineDot variant="outlined" className={"timeline_dot"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={"timeline_date"}>July 2022</TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent className={"timeline_date"} >
            June 2022
          </TimelineOppositeContent>
          <TimelineSeparator> 
            <TimelineDot variant="outlined" className={"timeline_dot"} />
          </TimelineSeparator>
          <TimelineContent className={"timeline_content"}>Birth of FOMO</TimelineContent>
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

