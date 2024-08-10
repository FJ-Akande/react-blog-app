import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ColorFulDiv from "../../components/colorful-div/colorful-div.component";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import userdp from "../../assets/userdp.png";
import { fetchPostDetails } from "../../utils/firebase/firebase.utils";
import { dateFormatter, formatRelativeTime } from "../../utils/helpers/helpers";

const DetailPage = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
    enabled: !!id,
  });

  if (!post) return <div>Loading...</div>;

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
