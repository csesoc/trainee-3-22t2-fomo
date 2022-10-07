import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { flexbox } from "@mui/system";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FaCalendarPlus } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
const titleStyle = {
  margin: "10px",
};

const EventEdit = ({eventId, societyName, eventName, description, start, end, color}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);

    setTags([]);
  };
  const handleClose = () => {
    setOpen(false);

    setTags([]);

    console.log(inputs.description);
  };
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [endTime, setEndTime] = useState(new Date(Date.now()));
  const [dateError, setDateError] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState([
    "Networking",
    "Workshop",
    "Social",
    "Free Food",
    "Alcohol",
    "Excursion",
    "Online",
    "In-person",
    "Sports",
    "Education",
  ]);
  const [societies, setSocieties] = useState([]);
  const [inputs, setInputs] = useState({
    eventName: "",
    description: "",
    societyId: "",
  });

  useEffect(() => {
    const getSocieties = async () => {
      try {
        const response = await axiosPrivate.get("/society/get/userIsMember");
        setSocieties(response.data.societies);
        console.log(response.data.societies);
      } catch (err) {
        console.error(err);
      }
    };
    getSocieties();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleStartChange = (newTime) => {
    setStartTime(newTime);
    if (startTime.getTime() <= endTime.getTime()) {
      setDateError(false);
      console.log("set error false");
    } else {
      setDateError(true);
    }
  };

  const handleEndChange = (newTime) => {
    setEndTime(newTime);
    if (startTime.getTime() <= endTime.getTime()) {
      setDateError(false);
      console.log("set error false");
    } else {
      setDateError(true);
    }
  };

  const handleDateError = (bool) => {
    setDateError(bool);
    console.log("set error " + bool);
  };

  const handleTagsChange = (e) => {
    let tagName = e.target.name;
    let newTags = [...tags];
    if (newTags.includes(tagName)) {
      let tagIndex = newTags.findIndex((tag) => tag === tagName);
      newTags.splice(tagIndex, 1);
    } else {
      newTags.push(tagName);
    }
    setTags(newTags);
    console.log(tags);
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axiosPrivate.post("/event/edit", {
        eventId: eventId,
        newInfo: {
          societyId: inputs.societyId,
          eventName: inputs.eventName,
          start: startTime.getTime(),
          end: endTime.getTime(),
          description: inputs.description,
          tags: tags
        }
      });
      console.log("success");
      handleClose();
    } catch (err) {
      console.log(err);
      console.log(inputs);
      if (err.response.status === 403 || err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} size="small" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ padding: "30px" }}>
          <div>
            <h2 style={titleStyle}>Edit Event</h2>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "72%" }}>
              <TextField
                label="Event Name"
                placeholder="Event Name"
                name="eventName"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "21.71%" }}>
              <InputLabel id="select-label">Society</InputLabel>
              <Select
                labelId="select-label"
                label="Society"
                name="societyId"
                onChange={handleChange}
                value={inputs.societyId}
              >
                {societies.map((society, i) => {
                  return (
                    <MenuItem value={society._id}>
                      {society.societyName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl sx={{ m: 1, width: "46.95%" }}>
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={handleStartChange}
                renderInput={(params) => <TextField {...params} />}
                disablePast={true}
                error={true}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "46.95%" }}>
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={handleEndChange}
                renderInput={(params) => <TextField {...params} />}
                minDate={startTime}
                disablePast={true}
                onError={() => {
                  handleDateError(true);
                }}
              />
              {dateError ? (
                <FormHelperText error={dateError}>
                  End date is before start date
                </FormHelperText>
              ) : null}
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
          {tagNames.map((tagName, i) => {
            return (
              <FormControlLabel
                sx={{ m: 1 }}
                label={tagName}
                control={<Checkbox name={tagName} onClick={handleTagsChange} />}
              />
            );
          })}
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {dateError === false &&
          inputs.eventName !== "" &&
          inputs.societyId !== "" ? (
            <Button onClick={handleSubmit}>Edit</Button>
          ) : (
            <Button disabled={true}>Edit</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventEdit;