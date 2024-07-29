import ColorFulDiv from "../colorful-div/colorful-div.component";
import { MdDelete } from "react-icons/md";

const Card = ({ showDelete = true, ...props }) => {
  return (
    <div
      className="bg-primary p-5 rounded-xl space-y-5 cursor-pointer"
      {...props}
    >
      {showDelete ? (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Need help with wireframe</h2>
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
        <h2 className="text-xl font-medium">Need help with wireframe</h2>
      )}
      <div className="text-sm space-y-2">
        <p>
          Level Required - <span className="font-bold">Expert</span> - Posted 3
          months ago
        </p>
        <p className="font-medium">
          I am trying to figure out how to wireframe this new website...
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
