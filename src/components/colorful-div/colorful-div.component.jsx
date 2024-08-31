const ColorFulDiv = ({ children }) => {
  const getColorClass = (children) => {
    let colorClass = "";

    switch (children) {
      case "Frontend":
        colorClass = "bg-red-500";
        break;
      case "Backend":
        colorClass = "bg-blue-500";
        break;
      case "UI/UX":
        colorClass = "bg-green-500";
        break;
      case "Scripts":
        colorClass = "bg-yellow-500";
        break;
      case "Wireframe":
        colorClass = "bg-purple-500";
        break;
      case "Just Code":
        colorClass = "bg-pink-500";
        break;
      case "Just Talk":
        colorClass = "bg-teal-500";
        break;
      default:
        colorClass = "bg-[#5F9CE5]";
        break;
    }
    return colorClass;
  };

  return (
    <span
      className={`p-2 ${getColorClass(
        children
      )} rounded-md text-xs font-medium`}
    >
      {children}
    </span>
  );
};

export default ColorFulDiv;
