import { createContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils/firebase/firebase.utils";

export const PostsContext = createContext({
  posts: {},
  fetchNextPage: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  isLoading: false,
  error: null,
});

export const PostsProvider = ({ children }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

  // Combine the posts from all pages into a single array
  const posts = data?.pages?.flatMap((page) => page.posts) || [];

  const value = {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
