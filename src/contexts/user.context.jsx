import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  onAuthStateChangedListener,
  getUserProfile,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  currentUserProfile: null,
  loading: true,
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

  const value = { currentUser, currentUserProfile, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
