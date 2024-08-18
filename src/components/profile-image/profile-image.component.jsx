import { FaCamera } from "react-icons/fa";

const ProfileImageUpload = ({ imagePreview, imageURL, ...props }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="relative rounded-full">
        <img
          src={imagePreview || imageURL}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover"
        />
        <label className="absolute bottom-2 right-2 bg-secondary p-2 rounded-full shadow-md cursor-pointer">
          <FaCamera className="text-white" />
          <input type="file" accept="image/*" className="hidden" {...props} />
        </label>
      </div>
      {imagePreview && (
        <p className="mt-2 text-xs text-red-500 text-center">
          This is just a preview, save changes to upload image.
        </p>
      )}
    </div>
  );
};

export default ProfileImageUpload;
