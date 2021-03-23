import { Notification as Toast } from 'rsuite';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: "AIzaSyB2AOFTboHdL3YUlhmFZhUwa7M163IIYDg",
  authDomain: "chat-web-app-d8a09.firebaseapp.com",
  databaseURL: "https://chat-web-app-d8a09-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-d8a09",
  storageBucket: "chat-web-app-d8a09.appspot.com",
  messagingSenderId: "866470994862",
  appId: "1:866470994862:web:0bbb58ab8ecc68c8bb9e3f"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BOoXxIPIiM2dtL3xvw2dhovLhPMTQZ6EDH7xeNWYKNKRHJNuUPeyRH_TsXbpKLkODbXAwX2cSkiivpOUbRiUSyM'
  );

  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useFunctionsEmulator('http://localhost:5001');
}
