import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const TransitionsModal = ({ addData }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const initialState = {
    name: '',
    fullName: '',
    watchers: null,
    forks: null,
    owner: '',
    openIssues: null,
  };

  const [ourState, ourSetState] = useState(initialState);

  const handleEventChange = (e) => {
    ourSetState({ ...ourState, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(ourState);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        type='button'
        onClick={handleOpen}
      >
        Add data
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form
              className={classes.root}
              onSubmit={handleSubmit}
              autoComplete='off'
            >
              <div>
                <TextField
                  id='outlined-name'
                  label='Name'
                  variant='outlined'
                  name='name'
                  onChange={handleEventChange}
                  required
                />
              </div>
              <div>
                <TextField
                  id='outlined-fullname'
                  label='Full Name'
                  variant='outlined'
                  name='fullName'
                  onChange={handleEventChange}
                  required
                />
              </div>
              <div>
                <TextField
                  id='outlined-watchers'
                  label='Watchers'
                  variant='outlined'
                  name='watchers'
                  onChange={handleEventChange}
                  type='number'
                  required
                />
              </div>
              <div>
                <TextField
                  id='outlined-forks'
                  label='Forks'
                  variant='outlined'
                  name='forks'
                  onChange={handleEventChange}
                  type='number'
                  required
                />
              </div>
              <div>
                <TextField
                  id='outlined-issues'
                  label='Open Issues'
                  variant='outlined'
                  name='openIssues'
                  onChange={handleEventChange}
                  type='number'
                  required
                />
              </div>
              <div>
                <TextField
                  id='outlined-owner'
                  label='Owner'
                  variant='outlined'
                  onChange={handleEventChange}
                  name='owner'
                  required
                />
              </div>
              <div className={classes.button}>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
