import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDLpM5ujDG5KqQBZqLatoNOwJLRR9FtaTY',
  authDomain: 'smilebright-ea045.firebaseapp.com',
  projectId: 'smilebright-ea045',
  storageBucket: 'smilebright-ea045.appspot.com',
  messagingSenderId: '951591779093',
  appId: '1:951591779093:web:7d73df27fd70fbbc8e471c',
  measurementId: "G-DN3V475TQQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);


export { auth, fs, storage ,analytics};
