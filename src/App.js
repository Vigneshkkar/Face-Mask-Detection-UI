import React, { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';

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

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  // ...
});

function App() {
  const [token, settoken] = useState('');
  getToken(messaging, {
    vapidKey:
      'BPnoAvdbSMMZ8H17K5eHfhd11PUAXoTXc3U-eRKBYmzabKcLuQ5VobEyBnm8V6xK2XIuBtpTQk_n3aX3DbkoXPs',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        settoken(currentToken);
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
  return (
    <div class='container'>
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
          Vigneshkkar Ravichandran <br></br> Syed Farhan <br></br> Santhi Priya
        </div>
      </div>
      <div id='token' class='token'>
        {token}
      </div>
    </div>
  );
}

export default App;
