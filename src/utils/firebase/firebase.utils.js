import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANV_mFjTw9CdrlSqGUoG7ATqntrSqZd-Q",
  authDomain: "nyblogs-gt.firebaseapp.com",
  projectId: "nyblogs-gt",
  storageBucket: "nyblogs-gt.appspot.com",
  messagingSenderId: "291492043762",
  appId: "1:291492043762:web:7d6c23b3347a50a2e3a96b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
