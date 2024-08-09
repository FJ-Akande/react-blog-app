import { formatDistanceToNow } from "date-fns";

export const dateFormatter = (timestamp) => {
  if (!timestamp) return "Unknown Date";

  const date = timestamp.toDate(); // Convert Firebase Timestamp to JS Date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRelativeTime = (firebaseTimestamp) => {
  if (!firebaseTimestamp || !firebaseTimestamp.toDate) {
    return "Invalid date";
  }

  const date = firebaseTimestamp.toDate(); // Convert Firebase Timestamp to JavaScript Date
  return formatDistanceToNow(date, { addSuffix: true });
};
