import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils/firebase/firebase.utils";

export const PostsContext = createContext({
  posts: {},
  isLoading: false,
  error: {},
});

export const PostsProvider = ({ children }) => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const value = {
    posts,
    isLoading,
    error,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
