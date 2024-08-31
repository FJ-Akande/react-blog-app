import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "../../contexts/user.context";
import {
  addCommentToPost,
  fetchPostDetails,
} from "../../utils/firebase/firebase.utils";
import {
  dateFormatter,
  formatRelativeTime,
} from "../../utils/date-utils/date-utils";
import useFetchCommentsProfiles from "../../hooks/fetch-comments-profiles.hook";
import ColorFulDiv from "../../components/colorful-div/colorful-div.component";
import Spinner from "../../components/spinner/spinner.component";
import Modal from "../../components/modal/modal.component";
import { errorToast } from "../../utils/toast/toast.utils";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const DetailPage = () => {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
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

  // Ensure the hook is always called, even if `postDetails?.comments` is undefined
  const { profilesMap, loading, error } = useFetchCommentsProfiles(
    post?.postDetails?.comments || []
  );

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleSubmit = () => {
    if (!comment) return;

    if (!currentUser?.uid) {
      errorToast("You must be signed in to add a comment");
      return;
    }

    const commentData = {
      text: comment,
      user: currentUser.uid,
    };

    mutation.mutate({ postId: id, comment: commentData });
  };

  if (postLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );

  if (postError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error loading post</p>
      </div>
    );

  if (!post)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Post not found</p>
      </div>
    );

  const { postDetails, authorDetails } = post;

  return (
    <div className="bg-secondary text-white min-h-screen py-24">
      <Modal
        modalType={"discord"}
        isOpen={isOpen}
        onClose={closeModal}
        discordName={authorDetails.discord}
      />
      <div className="max-w-[92%] md:max-w-[80%] mx-auto">
        <h1 className="font-semibold text-2xl hidden md:block">
          Project Details
        </h1>
        <div className="bg-primary max-w-[960px] mx-auto md:my-8 rounded-xl md:flex overflow-hidden">
          <div className="md:w-[60%] xl:w-[70%] p-4 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium">{postDetails.title}</h2>
              <p className="mt-5 mb-10 text-text">{postDetails.description}</p>
              <div className="flex items-center gap-2">
                {postDetails?.skills?.map((skill, index) => (
                  <ColorFulDiv key={index}>{skill}</ColorFulDiv>
                ))}
              </div>
              <h3 className="text-lg font-medium mt-8">Skills and Expertise</h3>
              <p className="text-sm text-text">
                Level Required - {postDetails.levelRequired} -{" "}
                {formatRelativeTime(postDetails.createdAt)}
              </p>
            </div>
            <div className="mt-12 mb-4 border-t border-text pt-4">
              <div className="space-y-6 max-h-[220px] overflow-y-scroll custom-scrollbar pb-5">
                <h3 className="font-medium">Comments</h3>
                {postDetails?.comments?.length === 0 && (
                  <p className="text-sm text-text">no comments found.</p>
                )}
                {postDetails?.comments?.map(
                  ({ text, user, createdAt }, idx) => {
                    const userProfile = profilesMap?.[user]; // Access the user profile based on userId

                    return (
                      <CommentCard
                        key={idx}
                        text={text}
                        user={userProfile?.displayName}
                        userProfileImage={userProfile?.imageURL}
                        createdAt={createdAt}
                      />
                    );
                  }
                )}
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
                  disabled={mutation.isPending}
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
          <div className="bg-[#1B232E] md:w-[40%] xl:w-[30%] py-8 flex flex-col items-center px-10">
            <div className="flex flex-1 flex-col items-center border-b border-text pb-10 md:pb-0">
              <div className="flex flex-col items-center">
                <img
                  src={authorDetails?.imageURL}
                  alt="userdp"
                  className="bg-black rounded-full object-cover w-[10rem] h-[10rem]"
                />
                <div className="flex flex-col items-center text-center py-6">
                  <h3 className="font-semibold text-xl">
                    {authorDetails.displayName}
                  </h3>
                  <p className="text-sm text-text py-5">
                    {authorDetails.bio ||
                      "Enthusiastic about all things tech. Always growing and evolving."}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center my-auto">
                <div className="flex items-center gap-3">
                  {authorDetails.twitter && (
                    <FaXTwitter
                      className="text-2xl cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/${authorDetails.twitter}`,
                          "_blank"
                        )
                      }
                    />
                  )}
                  {authorDetails.discord && (
                    <FaDiscord
                      className="text-2xl cursor-pointer"
                      onClick={openModal}
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-text pt-4 text-center">
              Member since {dateFormatter(authorDetails.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

const CommentCard = ({ text, user, userProfileImage, createdAt }) => {
  return (
    <div className="flex items-start gap-4">
      <img
        src={userProfileImage}
        alt="userdp"
        className="h-10 w-10 object-cover rounded-full"
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
