import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC1HyA4g2lrJK5PtFLYqYYDTRYtXrYlMEA',
  authDomain: 'face-mask-detection-ea05d.firebaseapp.com',
  projectId: 'face-mask-detection-ea05d',
  storageBucket: 'face-mask-detection-ea05d.appspot.com',
  messagingSenderId: '255902561610',
  appId: '1:255902561610:web:8ad34b8850e7e87ffd3db3',
  measurementId: 'G-D87SR6CFQP',
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
