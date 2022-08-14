import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import moment_timezone from "moment-timezone";
import ClipLoader from "react-spinners/ClipLoader";
import { CustomToolbar } from "./CustomToolbar";

import { convertDurationToDate } from "../utils/dates";

moment_timezone.tz.setDefault("Asia/Jerusalem");

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const handleAxiosCreateRespone = (response) => {
    console.log(response);
    const startDate = new Date(response.data.data.start);
    return {
      start: startDate,
      end: convertDurationToDate(
        response.data.data.start,
        response.data.data.duration
      ),
      duration: response.data.data.duration,
      title: response.data.data.title,
      _id: response.data.data._id,
    };
  };

  // Use for Moving & Resizing events
  const handleDndResize = function ({ event, start, end }) {
    const idx = events.indexOf(event);
    axios
      .put("http://localhost:4000/api/events", {
        ...event,
        start,
        duration: end - start,
        title: event.title,
      })
      .then((response) => {
        const updatedEvent = handleAxiosCreateRespone(response);
        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);
        setEvents(nextEvents);
      });
  };

  // // Use for Moving & Resizing events - Drag/Drop/Resize
  const handleSelectSlot = ({ start, end }) => {
    console.log("In handleSelectSlot");
    const title = window.prompt("Inset event title");
    if (title) {
      axios
        .post("http://localhost:4000/api/events", {
          start,
          duration: end - start,
          title,
        })
        .then((response) => {
          const createdEvent = handleAxiosCreateRespone(response);
          setEvents([...events, createdEvent]);
        })
        .catch((err) => {
          console.log("Error in handleSelectSlot", err);
        });
    }
  };

  const handleChange = () => {
    console.log("this block code executed");
  };

  const getEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:4000/api/events");
      const convertedData = data.events.map((element) => {
        const endDate = convertDurationToDate(element.start, element.duration);
        return {
          ...element,
          start: new Date(element.start),
          end: endDate,
        };
      });
      setEvents(convertedData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const customTimeGutterHeader = function () {
    return <div style={{ width: "60px" }}>all-day</div>;
  };
  useEffect(() => {
    getEvents();
  }, []);

  return loading ? (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClipLoader color={"#000000"} size={150} />
    </div>
  ) : (
    <div>
      <div style={{ borderTop: "5px solid rgb(255,215,0)" }}></div>

      <div
        style={{
          marginBottom: "15px",
          marginTop: "15px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <DragAndDropCalendar
          localizer={localizer}
          popup
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView={"week"}
          scrollToTime={moment().set({ h: 9, m: 0 }).toDate()}
          onEventDrop={handleDndResize}
          onEventResize={handleDndResize}
          //Hold press and drag to manipulate time
          onSelectSlot={handleSelectSlot}
          selectable
          components={{
            toolbar: CustomToolbar({ events, handleChange }),
            timeGutterHeader: customTimeGutterHeader,
          }}
          formats={{
            // Side pannel
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "ha", culture),
            //Inner event
            eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
              let s = localizer.format(start, "HH:mm", culture);
              let e = localizer.format(end, "HH:mm", culture);
              return `${s} - ${e}`;
            },
            agendaTimeRangeFormat: ({ start, end }, culture, localizer) => {
              let s = localizer.format(start, "HH:mm", culture);
              let e = localizer.format(end, "HH:mm", culture);
              return `${s} - ${e}`;
            },
            // Calendar header
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
              let s = localizer.format(start, "MMM DD ", culture);
              let e = localizer.format(end, "MMM DD, YYYY", culture);
              return `${s} - ${e}`;
            },
            // Weekly days header representation
            dayFormat: (date, culture, localizer) => {
              let s = localizer.format(date, "ddd M/D", culture);
              return `${s} `;
            },
            // Day header // TODO: how day header should be looked
            dayHeaderFormat: (date, culture, localizer) => {
              let s = localizer.format(date, "MMM d", culture);
              return `${s}`;
            },
            // Responsible for we month calendar heading TODO-fix
            weekdayFormat: ({ start, end }, culture, localizer) => {
              let s = localizer.format(start, " ", culture);
              return `${s}`;
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
