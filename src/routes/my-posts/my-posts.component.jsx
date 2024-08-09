import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user.context";
import { fetchUserPosts } from "../../utils/firebase/firebase.utils";
import Card from "../../components/card/card.component";
import { IoMdAdd } from "react-icons/io";

const MyPosts = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", currentUser?.uid],
    queryFn: () => fetchUserPosts(currentUser.uid),
    enabled: !!currentUser,
  });

  return (
    <div className="py-24 max-w-[60%] mx-auto text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <button
          className="bg-primary p-3 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => navigate("/create-blog")}
        >
          <span>
            <IoMdAdd className="text-2xl" />
          </span>
          Add new
        </button>
      </div>
      <div className="mt-10 space-y-5">
        {isLoading ? (
          <div className="text-center font-medium">Loading...</div>
        ) : isError ? (
          <p className="text-center font-medium">
            An error occurred while fetching posts.
          </p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              post={post}
              onClick={() => navigate(`/details/${post.id}`)}
            />
          ))
        ) : (
          <p className="text-center font-medium">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
