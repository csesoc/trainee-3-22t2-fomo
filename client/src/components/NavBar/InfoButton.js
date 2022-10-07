import { FaInfo } from "react-icons/fa";
import { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./InfoButton.css";

const InfoButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FaInfo className="close-btn" onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <div className="info-block">
          <DialogActions>
            <Button style={{ color: "green" }} onClick={handleClose}>
              X
            </Button>
          </DialogActions>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: "30px",
                paddingTop: "0px",
              }}
            >
              <div className="info-info">
                <h1>FOMO</h1>
                <h4>
                  ♡ Never let your bad organisation skills make you feel fomo
                  again ♡
                </h4>
                <br />
                <h3>INSPIRE TRANSCEND REVOLUTIONISE</h3>
                <br />
                <h3 style={{ textAlign: "center" }}>Creators</h3>
                <ul className="creators">
                  <li>Henry</li>
                  <li>Theo</li>
                  <li>Jasmine</li>
                  <li>Edward</li>
                </ul>
                <ul className="creators">
                  <li style={{ color: "rgb(36, 32, 32)" }}>Nathan</li>
                  <li style={{ color: "rgb(36, 32, 32)" }}>Ray</li>
                  <li style={{ color: "rgb(36, 32, 32)" }}>Sophia</li>
                </ul>
              </div>
            </Box>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default InfoButton;
