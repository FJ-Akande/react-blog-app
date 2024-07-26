const Input = ({ label, type, ...otherProps }) => {
  switch (type) {
    case "checkbox":
      return (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type={type}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-white dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
      );
    case "textarea":
      return (
        <div>
          {label && (
            <label
              htmlFor={type}
              className="block mb-2 text-sm font-medium text-text dark:text-white"
            >
              {label}
            </label>
          )}
          <textarea
            name="textarea"
            id="textarea"
            cols={10}
            rows={10}
            className="bg-gray-700 border border-gray-700 text-white text-sm rounded-lg w-full p-2.5 outline-none"
            required
            {...otherProps}
          />
        </div>
      );
    default:
      return (
        <div>
          {label && (
            <label
              htmlFor={type}
              className="block mb-2 text-sm font-medium text-text dark:text-white"
            >
              {label}
            </label>
          )}
          <input
            type={type}
            className="bg-gray-700 border border-gray-700 text-white text-sm rounded-lg w-full p-2.5 outline-none"
            required
            {...otherProps}
          />
        </div>
      );
  }
};

export default Input;
