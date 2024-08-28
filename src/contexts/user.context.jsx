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
  const [profileReady, setProfileReady] = useState(false);

  const { data: currentUserProfile, refetch: refetchUserProfile } = useQuery({
    queryKey: ["userProfile", currentUser?.uid],
    queryFn: () => getUserProfile(currentUser.uid),
    enabled: !!currentUser && profileReady,
    retry: true, // Retry fetching in case it fails initially
    retryDelay: 1000, // Delay between retries
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setProfileReady(true);
        } else {
          // Wait until profile is created in Firestore before attempting to fetch
          setTimeout(() => refetchUserProfile(), 1000); // Retry fetching after 1 second
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, currentUserProfile, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
