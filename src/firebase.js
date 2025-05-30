import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD6y05GuKooFKzes3-km1-5254OBOJkxFo",
  authDomain: "burger-c5b06.firebaseapp.com",
  projectId: "burger-c5b06",
  storageBucket: "burger-c5b06.firebasestorage.app",
  messagingSenderId: "288963655402",
  appId: "1:288963655402:web:31607d09621c53e35b8993",
  measurementId: "G-N2L45WMMSD",
  databaseURL: "https://burger-c5b06-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };