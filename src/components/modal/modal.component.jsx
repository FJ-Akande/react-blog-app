import ReactDom from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onConfirm, onClose, modalType, discordName }) => {
  if (!isOpen) return null;

  if (modalType === "discord") {
    if (!discordName) return null;
    return ReactDom.createPortal(
      <div onClick={onClose}>
        <div
          className={`fixed inset-0 bg-black transition-opacity ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="relative rounded-lg shadow bg-[#374151] w-full max-w-xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-text">
              <h1 className="font-bold text-xl">Connect with Discord</h1>
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <IoMdClose className="text-2xl text-text" onClick={onClose} />
              </button>
            </div>
            <div className="py-12 text-center font-bold text-xl tracking-widest">
              <span className="text-gray-900">Discord name:</span> {discordName}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  } else {
    return ReactDom.createPortal(
      <div onClick={onClose}>
        <div
          className={`fixed inset-0 bg-black transition-opacity ${
            isOpen ? "opacity-50" : "opacity-0"
          }`}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="relative bg-primary rounded-lg shadow dark:bg-gray-700 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-text w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={onConfirm}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={onClose}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
};

export default Modal;
