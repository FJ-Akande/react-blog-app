import ColorFulDiv from "../colorful-div/colorful-div.component";

const Card = ({ ...props }) => {
  return (
    <div
      className="bg-primary p-5 rounded-xl space-y-5 cursor-pointer"
      {...props}
    >
      <h2 className="text-xl font-medium">Need help with wireframe</h2>
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
          <ColorFulDiv>Frontend</ColorFulDiv>
          <ColorFulDiv>Backend</ColorFulDiv>
          <ColorFulDiv>Fullstack</ColorFulDiv>
        </div>
        <p className="text-sm text-gray-400">May 1, 2024</p>
      </div>
    </div>
  );
};

export default Card;
