import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserAdd = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [adminSocieties, setAdminSocieties] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const handleSelectId = (e, id) => {
    setSelectedId(id);
  };

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleAddUser = () => {
    axiosPrivate
      .post("/society/addUser", {
        societyId: selectedId,
        email: email,
      })
      .then(() => {
        setEmail("");
        setSelectedId("");
        setSuccess(true);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
      });
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleCloseError = () => {
    setError("");
  };

  useEffect(() => {
    const getAdminSocieities = async () => {
      const response = await axiosPrivate.get("/society/get/userIsAdmin");
      setAdminSocieties(response.data.societies);
      console.log(response);
      console.log(adminSocieties);
    };
    getAdminSocieities();
  }, []);

  return (
    <>
      <GroupAddIcon onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a user to a society you are an admin of</DialogTitle>
        <DialogContent>
          <List>
            {adminSocieties.length ? (
              adminSocieties.map((society) => (
                <ListItemButton
                  key={society._id}
                  selected={selectedId == society._id}
                  onClick={(e) => handleSelectId(e, society._id)}
                >
                  {society.societyName}
                </ListItemButton>
              ))
            ) : (
              <DialogContentText>
                You are not an admin of any societies
              </DialogContentText>
            )}
          </List>
          {selectedId && (
            <TextField
              autoFocus
              label="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </DialogContent>
        {selectedId && (
          <DialogActions>
            <Button onClick={handleAddUser}>Add user to society</Button>
          </DialogActions>
        )}
      </Dialog>
      <Snackbar open={success} onClose={handleCloseSuccess}>
        <Alert severity="success">User successfully added to society!</Alert>
      </Snackbar>
      <Snackbar open={Boolean(error)} onClose={handleCloseError}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};

export default UserAdd;
