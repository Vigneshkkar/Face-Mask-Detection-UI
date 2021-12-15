import React, { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyC1HyA4g2lrJK5PtFLYqYYDTRYtXrYlMEA',
  authDomain: 'face-mask-detection-ea05d.firebaseapp.com',
  projectId: 'face-mask-detection-ea05d',
  storageBucket: 'face-mask-detection-ea05d.appspot.com',
  messagingSenderId: '255902561610',
  appId: '1:255902561610:web:8ad34b8850e7e87ffd3db3',
  measurementId: 'G-D87SR6CFQP',
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

// const messaging = firebase.messaging();
// Add the public key generated from the console here.
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
function App() {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    setOpen(true);
    birdSound.play();
    // ...
  });
  const [token, settoken] = useState('');
  const [open, setOpen] = useState(false);
  getToken(messaging, {
    vapidKey:
      'BPnoAvdbSMMZ8H17K5eHfhd11PUAXoTXc3U-eRKBYmzabKcLuQ5VobEyBnm8V6xK2XIuBtpTQk_n3aX3DbkoXPs',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        settoken(currentToken);
        axios
          .get(
            'https://face-mask-detect-vicky.herokuapp.com/?id=' + currentToken
          )
          .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
          });
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  // const [fatLady, setfatLady] = useState(initialState);
  // useEffect(() => {
  //   setfatLady(document.getElementById('gilda'));
  //   fatLady.onended = function () {
  //     fatLady.pause();
  //     fatLady.currentTime = 0; // << only needed if you're cutting off the sound misstep (before the end) and need to return to the beginning - but you might need it. Since you are doing some gaming, I figured that might come up...
  //   };
  //   return () => {};
  // }, []);
  // const audioEl = useRef();
  const birdSound = new Audio('./warning_notice.mp3');
  birdSound.loop = false;

  return (
    <div class='container'>
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <Alert severity='error' action={action}>
          A Person Entered the Store without Mask.
        </Alert>
      </Snackbar>
      {/* <audio ref={audioEl}>
        <source url='warning_notice.mp3' />
      </audio> */}
      <div class='titleCont'>
        <div class='title'>Face mask detection</div>
        <div class='subHead'>Python project</div>
      </div>
      <div class='apptitle'>Manager app</div>
      <div class='desc'>
        This is a demo Manager app which manager has and which they will be
        running on their phone or computer
      </div>
      <div class='namesCont'>
        <div class='presBy'>Presented by:</div>
        <div class='names'>
          Vigneshkkar Ravichandran <br></br> Syed Farhan <br></br> Santhi Priya{' '}
          <br></br> Shalbin Benny
        </div>
      </div>
      <div id='token' class='token'>
        {token}
      </div>
    </div>
  );
}

export default App;
