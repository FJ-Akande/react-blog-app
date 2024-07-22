const Card = () => {
  return (
    <div className="bg-primary p-5 rounded-xl space-y-5">
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
          <button className="border border-gray-500 rounded-lg p-2 text-xs">
            Frontend
          </button>
          <button className="border border-gray-500 rounded-lg p-2 text-xs">
            Backend
          </button>
          <button className="border border-gray-500 rounded-lg p-2 text-xs">
            Fullstack
          </button>
        </div>
        <p className="text-sm text-gray-400">May 1, 2024</p>
      </div>
    </div>
  );
};

export default Card;
