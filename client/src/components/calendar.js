import React from "react";
import "./calendar.css"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "../config/axios";

import { useState, useEffect } from 'react';
import { getDate } from "date-fns";


const Calendar = () => {
  const events = [{ title: "today's event", date: new Date() }];
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('/event/get')
        console.log(response.data)
      } catch (err) {
        console.error(err);
      }
    }
    getEvents();
  }) 
  return (
    <FullCalendar
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={[events]}
      className="calendarBody"
    />  
  )
}

export default Calendar