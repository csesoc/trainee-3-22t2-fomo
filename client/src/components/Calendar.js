import React from "react";
import "./calendar.css"

import SocFollowing from './SocFollowing';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "../config/axios";

import { Dialog, Box, Grid,  } from "@mui/material";
import { useState, useEffect } from 'react';
import { getDate, format } from "date-fns";

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
    fetch("http://localhost:5000/society/getAll")
    .then((response) => response.json())
    .then((data) => {
      setFullSocList(data)
    });
  }, []);

  // Add a society to the following box
  const addSociety = (id) => {
    const newSoc = fullSocList.filter((society) => society.societyId === id)[0]
    if (!societies.includes(newSoc)) {
      setSocieties([...societies, newSoc])
    }
  }

  // delete a society from following box
  const delSociety = (id) => {
    setSocieties(societies.filter((society) => society.societyId !== id))
  }
  
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
    if (startDate.toDateString() === endDate.toDateString()) {
      startDate = format(startDate, "dd/MM/yyyy h:mm aaaaa'm'")
      endDate = format(endDate, "h:mm aaaaa'm'")
    } else {
      startDate = format(startDate, "dd/MM/yyyy h:mm aaaaa'm'")
      endDate = format(endDate, "dd/MM/yyyy h:mm aaaaa'm'")
    }
    let displayColor = currEvent.color !== undefined ? currEvent.color : "#000000"
    let newDisplayInfo = {
      societyName: currEvent.societyName,
      eventName: currEvent.eventName,
      description: currEvent.description,
      start: startDate,
      end: endDate,
      color: hexToRgb(displayColor)
    }
    if (newDisplayInfo.description === '') {
      newDisplayInfo.description = 'No description :('
    }
    setDisplayInfo(newDisplayInfo)
    setOpen(true)

  }
  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ padding: '15px', paddingTop: '0px' }}>
        <h1 style={{ marginTop: '10px', marginBottom: '2px'}}>{displayInfo.eventName}</h1>
        <h3 style={{ marginTop: '0px', marginBottom:'2px', color: displayInfo.color}}>{displayInfo.societyName}</h3>
        <h6 style={{ marginTop: '0px', marginBottom:'2px'}}><b>{displayInfo.start} -- {displayInfo.end}</b></h6>
        <hr></hr>
        <p style={{ whiteSpace: 'pre-line'}}>{displayInfo.description}</p>
      </Box>
    </Dialog>
    <Grid container spacing={2} sx={{ padding: '15px' }}>
      <Grid item xs={8}>
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          eventClick={handleEventClick}
        />
      </Grid>
      <Grid item xs={2}>
        <SearchBar addSociety={addSociety} fullSocList={fullSocList}/>
        <SocFollowing societies={fullSocList} delSociety={delSociety}/>
      </Grid>
      <Grid item xs={2}>
        <TagFilter tags={tags} tagNames={tagNames} updateTags={updateTags}/>
      </Grid>
    </Grid>
    </div>
  )
}

export default Calendar