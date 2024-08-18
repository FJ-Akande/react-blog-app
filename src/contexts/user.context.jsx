import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  onAuthStateChangedListener,
  getUserProfile,
} from "../utils/firebase/firebase.utils";

const defaultImageURL =
  "https://firebasestorage.googleapis.com/v0/b/cannabud-ny.appspot.com/o/defaultProfileImage.png?alt=media&token=73c17e7a-c52c-4d1c-9c40-6c6429367928";

export const UserContext = createContext({
  currentUser: null,
  currentUserProfile: null,
  loading: true,
  defaultImageURL: "",
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: currentUserProfile } = useQuery({
    queryKey: ["userProfile", currentUser?.uid],
    queryFn: () => getUserProfile(currentUser.uid),
    enabled: !!currentUser,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, currentUserProfile, loading, defaultImageURL };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
