const ColorFulDiv = ({ children, instance }) => {
  const colorClasses = {
    1: "bg-red-500",
    2: "bg-blue-500",
    3: "bg-green-500",
    4: "bg-green-500",
    5: "bg-purple-500",
  };

  return (
    <span
      className={`p-2 ${
        colorClasses[Number(instance)] || "bg-red-500"
      } rounded-md text-xs font-medium`}
    >
      {children}
    </span>
  );
};

export default ColorFulDiv;
