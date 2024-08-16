import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user.context";
import {
  addCommentToPost,
  fetchPostDetails,
} from "../../utils/firebase/firebase.utils";
import { dateFormatter, formatRelativeTime } from "../../utils/helpers/helpers";
import ColorFulDiv from "../../components/colorful-div/colorful-div.component";
import Spinner from "../../components/spinner/spinner.component";
import userdp from "../../assets/userdp.png";
import { errorToast } from "../../utils/toast/toast.utils";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const DetailPage = () => {
  const { currentUserProfile } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: addCommentToPost,
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries(["post", id]);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  const handleSubmit = () => {
    if (!comment) return;

    if (!currentUserProfile || !currentUserProfile.displayName) {
      errorToast("You must be signed in to post a comment");
      return;
    }

    const commentData = {
      text: comment,
      user: currentUserProfile.displayName, // or currentUser.uid
    };

    mutation.mutate({ postId: id, comment: commentData });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading post</p>
      </div>
    );

  if (!post)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No post found</p>
      </div>
    );

  const { postDetails, authorDetails } = post;

  const openSocialPage = (platform, handleOrLink) => {
    let url;
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/${handleOrLink}`;
        break;
      case "discord":
        url = handleOrLink; // handleOrLink should be the full invite link for Discord
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="bg-secondary text-white min-h-screen py-24">
      <div className="max-w-[80%] mx-auto">
        <h1 className="font-semibold text-2xl">Project Details</h1>
        <div className="bg-primary max-w-[960px] mx-auto my-8 rounded-xl flex overflow-hidden">
          <div className="w-[70%] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium">{postDetails.title}</h2>
              <p className="mt-5 mb-10 text-text">{postDetails.description}</p>
              <div className="flex items-center gap-2">
                {postDetails?.skills?.map((skill, index) => (
                  <ColorFulDiv instance={index + 1} key={index}>
                    {skill}
                  </ColorFulDiv>
                ))}
              </div>
              <h3 className="text-lg font-medium mt-8">Skills and Expertise</h3>
              <p className="text-sm text-text">
                Level Required - {postDetails.levelRequired} -{" "}
                {formatRelativeTime(postDetails.createdAt)}
              </p>
            </div>
            <div className="my-12 border-t border-text pt-4">
              <div className="space-y-6 max-h-[220px] overflow-y-scroll custom-scrollbar pb-5">
                <h3 className="font-medium">Comments</h3>
                {postDetails?.comments?.length == 0 && (
                  <p className="text-sm text-text">no comments found.</p>
                )}
                {postDetails?.comments.map(({ text, user, createdAt }, idx) => (
                  <CommentCard
                    key={idx}
                    text={text}
                    user={user}
                    createdAt={createdAt}
                  />
                ))}
              </div>
              <div className="w-full mt-5 relative flex items-center">
                <input
                  type="text"
                  className="bg-transparent w-full rounded-lg focus:ring-0 outline-none text-sm placeholder:text-sm py-3"
                  placeholder="write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 ${
                    mutation.isPending && "bg-text"
                  }`}
                  onClick={handleSubmit}
                >
                  <IoIosSend className="text-xl" />
                </button>
              </div>
            </div>
            <p className="text-xs text-text">
              Posted on {dateFormatter(postDetails.createdAt)}
            </p>
          </div>
          <div className="bg-[#1B232E] w-[30%] py-8 flex flex-col items-center px-10">
            <img
              src={userdp}
              alt="userdp"
              className="bg-black rounded-full object-cover w-[10rem] h-[10rem]"
            />
            <div className="flex flex-col items-center text-center py-6 border-b border-gray-700">
              <h3 className="font-semibold text-xl">
                {authorDetails.displayName}
              </h3>
              <p className="text-sm text-text py-5">{authorDetails.bio}</p>
              <div className="my-14 flex items-center gap-3">
                {/* <FaGithub className="text-2xl" /> */}
                <FaXTwitter
                  className="text-2xl cursor-pointer"
                  onClick={() =>
                    openSocialPage("twitter", authorDetails.twitter)
                  }
                />
                {authorDetails.discord && (
                  <FaDiscord className="text-2xl cursor-pointer" />
                )}
              </div>
            </div>
            <p className="text-xs text-text pt-4">
              Member since {dateFormatter(authorDetails.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

const CommentCard = ({ text, user, createdAt }) => {
  return (
    <div className="flex items-start gap-4">
      <img
        src={userdp}
        alt="userdp"
        className="h-10 w-10 rounded-full bg-black"
      />
      <div className="text-sm">
        <p className="font-medium">{user}</p>
        <p className="text-text mt-1">
          {text} -{" "}
          <span className="text-xs">{formatRelativeTime(createdAt)}</span>
        </p>
      </div>
    </div>
  );
};
