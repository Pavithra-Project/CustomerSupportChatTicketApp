import React, { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

export default function NotificationExample() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Resolve Ticket
      </Button>

      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Your query has been resolved ✅
        </Alert>
      </Snackbar>
    </div>
  );
}
