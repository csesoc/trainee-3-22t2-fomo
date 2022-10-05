import React from "react";
import "./calendar.css"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "../config/axios";

import { Dialog, Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import EventRemove from './EventRemove';

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
          // newStart = newStart.toLocaleString()
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

  const handleEventClick = (info) => {
    let currEvent = eventsData.find(event => event._id === info.event.id);
    console.log(currEvent)
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
      color: hexToRgb(displayColor),
      eventId: info.event.id
    }
    if (newDisplayInfo.description === '') {
      newDisplayInfo.description = 'No description :('
    }
    setDisplayInfo(newDisplayInfo)
    setOpen(true)

  }
  return (
    <div>
    <FullCalendar
      initialView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={events}
      eventClick={handleEventClick}
    />  
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ padding: '15px', paddingTop: '0px' }}>
        <h1 style={{ marginTop: '10px', marginBottom: '2px'}}>{displayInfo.eventName}</h1>
        <h3 style={{ marginTop: '0px', marginBottom:'2px', color: displayInfo.color}}>{displayInfo.societyName}</h3>
        <h6 style={{ marginTop: '0px', marginBottom:'2px'}}><b>{displayInfo.start} -- {displayInfo.end}</b></h6>
        <hr></hr>
        <p style={{ whiteSpace: 'pre-line'}}>{displayInfo.description}</p>
        <br />
        <EventRemove eventId={displayInfo.eventId}/>
      </Box>
    </Dialog>
    </div>
  )
}

export default Calendar