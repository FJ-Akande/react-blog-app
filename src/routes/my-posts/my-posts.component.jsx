import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user.context";
import {
  fetchUserPosts,
  deletePost,
} from "../../utils/firebase/firebase.utils";
import Modal from "../../components/modal/modal.component";
import Card from "../../components/card/card.component";
import Spinner from "../../components/spinner/spinner.component";
import { successToast } from "../../utils/toast/toast.utils";
import { IoMdAdd } from "react-icons/io";

const MyPosts = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", currentUser?.uid],
    queryFn: () => fetchUserPosts(currentUser.uid),
    enabled: !!currentUser,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", currentUser?.uid]);
      closeModal();
      successToast("Post deleted");
    },
    onError: (error) => {
      errorToast("Error deleting post:", error.message);
    },
  });

  const handleDeletePost = () => mutation.mutate(postIdToDelete);

  const openModal = (postId) => {
    setIsOpen(true);
    setPostIdToDelete(postId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPostIdToDelete(null);
  };

  return (
    <div className="py-24 max-w-[60%] mx-auto text-white">
      <Modal
        isOpen={isOpen}
        onConfirm={handleDeletePost}
        onClose={closeModal}
      />
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
          <div>
            <Spinner />
          </div>
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
              handleDeletePost={(e) => {
                e.stopPropagation();
                openModal(post.id);
              }}
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
