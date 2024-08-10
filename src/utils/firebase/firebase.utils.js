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
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  query,
  orderBy,
  where,
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

export const addNewPost = async (post) => {
  const postsCollectionRef = collection(db, "posts");
  const newPost = {
    ...post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    comments: [],
  };

  try {
    const docRef = await addDoc(postsCollectionRef, newPost);
  } catch (error) {
    console.error("Error adding document:", error.message);
  }
};

export const fetchPosts = async () => {
  const postCollectionRef = collection(db, "posts");
  const q = query(postCollectionRef, orderBy("createdAt", "desc"));

  const postsSnapshot = await getDocs(q);

  const postList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return postList;
};

export const fetchUserPosts = async (userId) => {
  if (!userId) return;

  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("authorId", "==", userId));
  const querySnapshot = await getDocs(q);

  const userPosts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return userPosts;
};

// const addCommentToPost = async (postId, comment) => {
//   const postDocRef = doc(db, "posts", postId);
//   const newComment = {
//     ...comment,
//     createdAt: Timestamp.now(),
//   };

//   try {
//     await updateDoc(postDocRef, {
//       comments: arrayUnion(newComment),
//       updatedAt: Timestamp.now(),
//     });
//     console.log("Comment added successfully");
//   } catch (e) {
//     console.error("Error adding comment: ", e);
//   }
// };

export const fetchPostDetails = async (postId) => {
  if (!postId) return;

  const postDocRef = doc(db, "posts", postId);
  const postSnapshot = await getDoc(postDocRef);

  let postDetails = null;
  let authorDetails = null;

  if (postSnapshot.exists()) {
    postDetails = postSnapshot.data();

    const authorDocRef = doc(db, "users", postDetails.authorId);
    const authorSnapshot = await getDoc(authorDocRef);

    if (authorSnapshot.exists()) {
      authorDetails = authorSnapshot.data();
    } else {
      throw new Error("Author not found");
    }
  } else {
    console.error("Post does not exist");
    return null;
  }

  return { postDetails, authorDetails };
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
