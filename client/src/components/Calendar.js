import React from "react";
import './calendar.css';
import styles from './Soc.module.css';
import searchStyles from './SearchBar.module.css';

import SocFollowing from './SocFollowing';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "../config/axios";

import { Dialog, Box, Grid,  } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import EventRemove from './EventRemove';
import EventEdit from "./EventEdit";

// For some reason, you can't style the color of text with hex. So we will need to convert it to rbg
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    let r = parseInt(result[1], 16).toString()
    let g = parseInt(result[2], 16).toString()
    let b = parseInt(result[3], 16).toString()
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    return null
  }
}
const Calendar = () => {
  const [tags, setTags] = useState([])
  const [tagNames, setTagNames] = useState([    
  'Networking', 
  'Workshop', 
  'Social', 
  'Free Food', 
  'Alcohol', 
  'Excursion', 
  'Online', 
  'In-person', 
  'Sports', 
  'Education'
  ])
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState([])
  const [displayInfo, setDisplayInfo] = useState({})
  const handleClose = () => {setOpen(false)};
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('/event/get')
        let newEvents = []
        for (const event of response.data) {
          let newStart = new Date()
          newStart.setTime(event.start)
          let newEnd = new Date()
          newEnd.setTime(event.end)
          newEvents.push({
            title: event.eventName,
            start: newStart,
            end: newEnd,
            id: event._id,
            color: event.color
          })
        }
        setEventsData(response.data)
        setEvents(newEvents)

      } catch (err) {
        console.error(err);
      }
    }
    getEvents();
  }, []) 

  // Societies currently following list
  const [societies, setSocieties] = useState([]);
  // Full list of societies from db
  const [fullSocList, setFullSocList] = useState([]);
  
  // Filter out events by tags/societies
  useEffect(() => {
    let newEvents = []
    let filteredEvents = [...eventsData]
    if (tags.length > 0) {
      // let filteredEvents = newEventsData.filter((event) => { societies.includes(event.societyName) })
      filteredEvents = filteredEvents.filter((event) => {
        for (const tag of event.tags) {
          if (tags.includes(tag)) {
            return true 
          };
        };
        return false 
      })
    }
    if (societies.length > 0) {
      let societiesArr = []
      for (const society of societies) {
        societiesArr.push(society.societyName)
      }
      filteredEvents = filteredEvents.filter((event) => {
        return societiesArr.includes(event.societyName)
      })
    }
    for (const event of filteredEvents) {
      let newStart = new Date()
      newStart.setTime(event.start)
      let newEnd = new Date()
      newEnd.setTime(event.end)
      newEvents.push({
        title: event.eventName,
        start: newStart,
        end: newEnd,
        id: event._id,
        color: event.color
      })
    }
    setEvents(newEvents)
  }, [tags, societies])

  // Get all societies from db and sets fullSocList accordingly
  useEffect(() => {
    const getSocs = async () => {
      try {
        const response = await axios.get('/society/getAll');
        setFullSocList(response.data)
      } catch (err) {
        console.error(err);
      }
    }
    getSocs();
  }, []);

  // Add a society to the following box
  const addSociety = (id) => {
    const newSoc = fullSocList.filter((society) => society._id === id)[0]
    if (!societies.includes(newSoc)) {
      setSocieties([...societies, newSoc])
    }
  }

  // delete a society from following box
  const delSociety = (id) => {
    setSocieties(societies.filter((society) => society._id !== id))
  }

  // all societies in the societies array are "chosen" (blue color) in the following box
  useEffect(() => {
    const socs = document.querySelectorAll(`.${styles.followSoc}`);
    const searchMatches = document.querySelectorAll(`.${searchStyles.searchMatch}`);
    const socNames = societies.map((society) => society.societyName);
    for (const soc of socs) {
      if (socNames.includes(soc.textContent)) {
        soc.classList.add(`${styles.followSocActive}`);
      } else {
        soc.classList.remove(`${styles.followSocActive}`);
      }
    }
    for (const match of searchMatches) {
      if (socNames.includes(match.textContent)) {
        match.classList.add(`${searchStyles.searchMatchActive}`);
      } else {
        match.classList.remove(`${searchStyles.searchMatchActive}`);
      }
    }
  }, [societies]);
  
  // Update tag when clicked
  const updateTags = (tagName) => {
    let tagIndex = tags.findIndex((tag) => tag === tagName);
    let newTags = [...tags];
    if (tagIndex === -1) {
      newTags.push(tagName);
      setTags(newTags);
    } else {
      newTags.splice(tagIndex, 1);
      setTags(newTags);
    }
    console.log(tags);
  }

  const handleEventClick = (info) => {
    let currEvent = eventsData.find(event => event._id === info.event.id);
    let startDate = new Date()
    let endDate = new Date()
    startDate.setTime(currEvent.start)
    endDate.setTime(currEvent.end)
    let startStr;
    let endStr;
    if (startDate.toDateString() === endDate.toDateString()) {
      startStr = format(startDate, "dd/MM/yyyy h:mm aaaaa'm'")
      endStr = format(endDate, "h:mm aaaaa'm'")
    } else {
      startStr = format(startDate, "dd/MM/yyyy h:mm aaaaa'm'")
      endStr = format(endDate, "dd/MM/yyyy h:mm aaaaa'm'")
    }
    let displayColor = currEvent.color !== undefined ? currEvent.color : "#000000"
    let newDisplayInfo = {
      societyName: currEvent.societyName,
      eventName: currEvent.eventName,
      description: currEvent.description,
      start: startStr,
      end: endStr,
      startObj: startDate,
      endObj: endDate,
      color: hexToRgb(displayColor),
      eventId: info.event.id
    }
    if (newDisplayInfo.description === '') {
      newDisplayInfo.description = 'No description :('
    }
    setDisplayInfo(newDisplayInfo)
    setOpen(true)

  }

  const theme = useTheme();
  const showBig = useMediaQuery('(min-width:1024px)');
  const showMedium = useMediaQuery('(min-width:426px) and (max-width:1023px)');
  const showSmall = useMediaQuery('(max-width:425px)');
  const showMedHeight = useMediaQuery('(min-height:380px) and (max-height:500px)');
  const showSmallHeight = useMediaQuery('(max-height:380px)');

  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ padding: '30px' }}>
        <h1 style={{ marginTop: '10px', marginBottom: '2px'}}>{displayInfo.eventName}</h1>
        <h3 style={{ marginTop: '0px', marginBottom:'2px', color: displayInfo.color}}>{displayInfo.societyName}</h3>
        <h6 style={{ marginTop: '0px', marginBottom:'2px'}}><b>{displayInfo.start} -- {displayInfo.end}</b></h6>
        <hr></hr>
        <p style={{ whiteSpace: 'pre-line'}}>{displayInfo.description}</p>
        <br />
        <div className="event-actions">
          <EventRemove eventId={displayInfo.eventId}/>
          <EventEdit 
            eventId={displayInfo.eventId} 
            societyName={displayInfo.societyName}
            eventName={displayInfo.eventName}
            description={displayInfo.description}
            startObj={displayInfo.startObj}
            endObj={displayInfo.endObj}
            color={displayInfo.color}
          />
        </div>
      </Box>
    </Dialog>
    {/* ABOVE 1024PX */}
    {showBig && !showMedHeight && !showSmallHeight && <Grid container spacing={2} sx={{ padding: '15px' }}>
      <Grid item xs={8}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          eventClick={handleEventClick}
        />
      </Grid>
      <Grid item xs={2}>
        <div className={styles.socWrapper}>
          <SearchBar addSociety={addSociety} fullSocList={fullSocList} delSociety={delSociety}/>
          <SocFollowing societies={fullSocList} addSociety={addSociety} delSociety={delSociety}/>
        </div>
      </Grid>
      <Grid item xs={2}>
        <TagFilter tags={tags} tagNames={tagNames} updateTags={updateTags}/>
      </Grid>
    </Grid>}
    {/* ABOVE 425PX OR HEIGHT LESS THAN 500PX */}
    {(showMedium || showMedHeight) && !showSmallHeight && <Grid container spacing={2} sx={{ padding: '15px' }}>
      <Grid item xs={12}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          eventClick={handleEventClick}
        />
      </Grid>
      <Grid item xs={5}>
        <div className={styles.socWrapper}>
          <SearchBar addSociety={addSociety} fullSocList={fullSocList} delSociety={delSociety}/>
          <SocFollowing societies={fullSocList} addSociety={addSociety} delSociety={delSociety}/>
        </div>
      </Grid>
      <Grid item xs={7}>
        <TagFilter tags={tags} tagNames={tagNames} updateTags={updateTags}/>
      </Grid>
    </Grid>}
    {/* ANYTHING SMALLER */}
    {(showSmall || showSmallHeight) && !showMedHeight && <Grid container spacing={2} sx={{ padding: '15px' }}>
      <Grid item xs={12}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          eventClick={handleEventClick}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={styles.socWrapper}>
          <SearchBar addSociety={addSociety} fullSocList={fullSocList} delSociety={delSociety}/>
          <SocFollowing societies={fullSocList} addSociety={addSociety} delSociety={delSociety}/>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TagFilter tags={tags} tagNames={tagNames} updateTags={updateTags}/>
      </Grid>
    </Grid>}
    </div>
  )
}

export default Calendar