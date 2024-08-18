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
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  arrayUnion,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export const updateUserProfile = async ({ userId, profileData, imageFile }) => {
  if (!userId) return;

  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  const lastUpdated = userSnapshot.data().lastUpdated;

  // Check if an hour has passed since the last update
  const now = new Date();
  if (lastUpdated && now - lastUpdated.toDate() < 3600000) {
    throw new Error("You can only update your profile once every hour.");
  }

  let imageURL = profileData.imageURL; // Default to existing imageURL

  // Upload image if provided
  if (imageFile) {
    const storageRef = ref(storage, `profileImages/${userId}`);
    try {
      await uploadBytes(storageRef, imageFile);
      imageURL = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image", error.message);
      throw new Error("Image upload failed.");
    }
  }

  // Update profile with image URL and other details
  try {
    await updateDoc(userDocRef, {
      ...profileData,
      imageURL, // Use the new or existing image URL
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

    const newPostSnapshot = await getDoc(docRef);

    return {
      id: docRef.id,
      ...newPostSnapshot.data(),
    };
  } catch (error) {
    console.error("Error adding document:", error.message);
  }
};

export const fetchPosts = async ({ pageParam = null }) => {
  const postsRef = collection(db, "posts");

  // Build the query: If `pageParam` is present, apply `startAfter` for pagination
  const postsQuery = pageParam
    ? query(
        postsRef,
        orderBy("createdAt", "desc"),
        startAfter(pageParam),
        limit(3)
      )
    : query(postsRef, orderBy("createdAt", "desc"), limit(3));

  // Execute the query
  const querySnapshot = await getDocs(postsQuery);

  // Map the results to an array of posts
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Find the last visible document in the query for pagination
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // Return the posts and the next cursor (if available)
  return {
    posts,
    nextCursor: lastVisible || null, // Return null if no more posts
  };
};

export const fetchUserPosts = async (userId) => {
  if (!userId) return;

  const postsRef = collection(db, "posts");
  const q = query(
    postsRef,
    where("authorId", "==", userId)
    // orderBy("createdAt", "desc") // come back to this!
  );
  const querySnapshot = await getDocs(q);

  const userPosts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return userPosts;
};

export const addCommentToPost = async ({ postId, comment }) => {
  const postRef = doc(db, "posts", postId);

  const commentWithTimestamp = {
    ...comment,
    createdAt: new Date(),
  };

  try {
    await updateDoc(postRef, {
      comments: arrayUnion(commentWithTimestamp),
    });
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
  }
};

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

export const deletePost = async (postId) => {
  if (!postId) return;

  try {
    const postDocRef = doc(db, "posts", postId);
    await deleteDoc(postDocRef);
  } catch (error) {
    console.error(error.message);
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
