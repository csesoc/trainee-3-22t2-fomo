
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

export default function OppositeContentTimeline() {
  return (
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
  );
} 