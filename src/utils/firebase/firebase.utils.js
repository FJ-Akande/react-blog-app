import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy76C_goWgKIv5jzZHSscxe_6WECIjexs",
  authDomain: "cannabud-ny.firebaseapp.com",
  projectId: "cannabud-ny",
  storageBucket: "cannabud-ny.appspot.com",
  messagingSenderId: "436953763210",
  appId: "1:436953763210:web:934e5c4161d6889f9b8c73",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const updateUserProfile = async (userId, profileData) => {
  if (!userId) return;

  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  const lastUpdated = userSnapshot.data().lastUpdated;

  //Function to check if an hour has passed since the last update
  const now = new Date();
  if (lastUpdated && now - lastUpdated.toDate() < 3600000) {
    throw new Error("You can only update your profile once every hour.");
  }

  try {
    await updateDoc(userDocRef, {
      ...profileData,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user profile", error.message);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  if (!userId) return null;

  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.error("User does not exist");
    return null;
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
