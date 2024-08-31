import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import {
  dateFormatter,
  formatRelativeTime,
} from "../../utils/date-utils/date-utils";
import ColorFulDiv from "../colorful-div/colorful-div.component";
import { MdDelete } from "react-icons/md";

const Card = ({ post, handleDeletePost, ...otherProps }) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (!post) return <div>Loading...</div>;

  const { authorId, createdAt, description, levelRequired, skills, title } =
    post;

  const showDelete = useMemo(
    () => currentUser?.uid === authorId && location.pathname === "/my-posts",
    [currentUser, authorId, location.pathname]
  );

  return (
    <div
      className="bg-primary p-5 rounded-xl space-y-5 cursor-pointer"
      {...otherProps}
    >
      {showDelete ? (
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-medium">{title}</h2>
          <button
            className="flex items-center justify-center bg-secondary rounded-full p-1"
            onClick={handleDeletePost}
          >
            <MdDelete className="text-red-400 text-lg" />
          </button>
        </div>
      ) : (
        <h2 className="text-lg md:text-xl font-medium">{title}</h2>
      )}
      <div className="space-y-2">
        <p className="font-medium text-xs md:text-sm">
          {description?.split(" ").length > 25
            ? `${description?.split(" ").slice(0, 25).join(" ")}...`
            : description}
        </p>
        <p className="text-sm">
          Level Required - <span className="font-bold">{levelRequired}</span> -{" "}
          {formatRelativeTime(createdAt)}
        </p>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div className="flex items-center flex-wrap gap-2">
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
