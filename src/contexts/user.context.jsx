import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  getUserProfile,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  currentUserProfile: null,
  setCurrentUserProfile: () => null,
  loading: true,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const value = { currentUser, currentUserProfile, loading };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUserProfile(profile);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
