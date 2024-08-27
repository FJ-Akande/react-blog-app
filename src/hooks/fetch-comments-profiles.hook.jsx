import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/firebase/firebase.utils";

const useFetchCommentsProfiles = (comments) => {
  const userIds = comments?.map((comment) => comment.user); // Extract userIds from comments
  const uniqueUserIds = [...new Set(userIds)]; // Ensure uniqueness

  // Query to fetch all profiles for the unique userIds
  const {
    data: profilesMap,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfiles", uniqueUserIds], // React Query key
    queryFn: async () => {
      const profiles = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const profile = await getUserProfile(userId); // Fetch profile for each userId
          return { [userId]: profile }; // Return a key-value pair
        })
      );

      // Combine array of objects into a single object
      return profiles.reduce((acc, profile) => {
        return { ...acc, ...profile };
      }, {});
    },
    enabled: Boolean(comments && comments.length), // Only run if there are comments
  });

  return { profilesMap, loading: isLoading, error: isError };
};

export default useFetchCommentsProfiles;
