import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import ColorFulDiv from "../colorful-div/colorful-div.component";
import { MdDelete } from "react-icons/md";

const Card = ({ post, ...otherProps }) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false);

  if (!post) return <div>Loading...</div>;

  const {
    authorId,
    comments,
    createdAt,
    description,
    levelRequired,
    skills,
    title,
    updatedAt,
  } = post;

  useEffect(() => {
    if (currentUser?.uid === authorId && location.pathname === "/my-posts") {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [currentUser, authorId, location.pathname]);

  return (
    <div
      className="bg-primary p-5 rounded-xl space-y-5 cursor-pointer"
      {...otherProps}
    >
      {showDelete ? (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">
            {title ?? "Need help with wireframe"}
          </h2>
          <button
            className="flex items-center justify-center bg-secondary rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              alert("clicked!");
            }}
          >
            <MdDelete className="text-red-400 text-lg" />
          </button>
        </div>
      ) : (
        <h2 className="text-xl font-medium">
          {title ?? "Need help with wireframe"}
        </h2>
      )}
      <div className="text-sm space-y-2">
        <p>
          Level Required -{" "}
          <span className="font-bold">{levelRequired ?? "Expert"}</span> -
          Posted 3 months ago
        </p>
        <p className="font-medium">
          {description ??
            "I am trying to figure out how to wireframe this new website..."}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ColorFulDiv instance="1">Frontend</ColorFulDiv>
          <ColorFulDiv instance="2">Backend</ColorFulDiv>
          <ColorFulDiv instance="3">Fullstack</ColorFulDiv>
        </div>
        <p className="text-sm text-gray-400">May 1, 2024</p>
      </div>
    </div>
  );
};

export default Card;
