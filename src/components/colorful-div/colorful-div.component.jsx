let instanceCount = 0;

const ColorFulDiv = ({ children }) => {
  const currentInstance = instanceCount++;

  const getColorClass = (count) => {
    const colorClasses = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    return colorClasses[count % colorClasses.length];
  };

  return (
    <span
      className={`p-2 ${getColorClass(
        currentInstance
      )} rounded-md text-xs font-medium`}
    >
      {children}
    </span>
  );
};

export default ColorFulDiv;
