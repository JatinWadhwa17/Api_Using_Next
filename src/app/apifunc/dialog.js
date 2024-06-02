'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react'

export default function FormDialog({dialog,setdialog,handleSubmitDialog}) {
  const [open, setOpen] = React.useState(false);

  const[entrie,setentrie]=useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setdialog(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={dialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const confirmation = formJson.confirmation;
            handleSubmitDialog(confirmation);
          },
        }}
      >
        <DialogTitle>Verify</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit these details? Type 'Submit' if you want to move forward
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmation"
            name="confirmation"
            label=""
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
