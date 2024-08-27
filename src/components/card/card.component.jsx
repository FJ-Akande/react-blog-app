import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user.context";
import { deletePost } from "../../utils/firebase/firebase.utils";
import {
  dateFormatter,
  formatRelativeTime,
} from "../../utils/date-utils/date-utils";
import { errorToast, successToast } from "../../utils/toast/toast.utils";
import ColorFulDiv from "../colorful-div/colorful-div.component";
import { MdDelete } from "react-icons/md";

const Card = ({ post, ...otherProps }) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const queryClient = useQueryClient();

  if (!post) return <div>Loading...</div>;

  const {
    id,
    authorId,
    comments,
    createdAt,
    description,
    levelRequired,
    skills,
    title,
    updatedAt,
  } = post;

  const showDelete = useMemo(
    () => currentUser?.uid === authorId && location.pathname === "/my-posts",
    [currentUser, authorId, location.pathname]
  );

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      successToast("Post deleted");
    },
    onError: (error) => {
      errorToast("Error deleting post:", error.message);
    },
  });

  const handleDeletePost = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmation) {
      mutation.mutate(id);
    }
  };

  return (
    <div
      className="bg-primary p-5 rounded-xl space-y-5 cursor-pointer"
      {...otherProps}
    >
      {showDelete ? (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            className="flex items-center justify-center bg-secondary rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePost(id);
            }}
          >
            <MdDelete className="text-red-400 text-lg" />
          </button>
        </div>
      ) : (
        <h2 className="text-xl font-medium">{title}</h2>
      )}
      <div className="text-sm space-y-2">
        <p className="font-medium">
          {description?.split(" ").length > 25
            ? `${description?.split(" ").slice(0, 25).join(" ")}...`
            : description}
        </p>
        <p>
          Level Required - <span className="font-bold">{levelRequired}</span> -{" "}
          {formatRelativeTime(createdAt) ?? "Posted 3 months ago"}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {skills.map((skill, index) => (
            <ColorFulDiv instance={index + 1} key={index}>
              {skill}
            </ColorFulDiv>
          ))}
        </div>
        <p className="text-xs text-gray-400">{dateFormatter(createdAt)}</p>
      </div>
    </div>
  );
};

export default Card;
