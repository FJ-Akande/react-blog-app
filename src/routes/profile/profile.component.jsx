import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../utils/firebase/firebase.utils";
import Input from "../../components/input/input.component";
import ProfileImageUpload from "../../components/profile-image/profile-image.component";
import Spinner from "../../components/spinner/spinner.component";
import { errorToast, successToast } from "../../utils/toast/toast.utils";
import { ClipLoader } from "react-spinners";

const defaultFormFields = {
  displayName: "",
  bio: "",
  techStacks: "",
  discord: "",
  twitter: "",
};

const Profile = () => {
  const { currentUser, currentUserProfile } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentUserProfile) {
      setFormFields({
        displayName: currentUserProfile.displayName || "Anonymous",
        bio:
          currentUserProfile.bio ||
          "Enthusiastic about all things tech. Always growing and evolving.",
        techStacks: currentUserProfile.techStacks || "Typescript, NodeJS",
        discord: currentUserProfile.discord || "",
        twitter: currentUserProfile.twitter || "",
      });
      setIsLoading(false);
    }
  }, [currentUserProfile]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", currentUser.uid]);
      setImagePreview(null);
      successToast("Profile updated");
    },
    onError: (error) => {
      queryClient.invalidateQueries(["userProfile", currentUser.uid]);
      errorToast(error.message);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formFields.displayName === currentUserProfile.displayName &&
      formFields.bio === currentUserProfile.bio &&
      formFields.techStacks === currentUserProfile.techStacks &&
      formFields.discord === currentUserProfile.discord &&
      formFields.twitter === currentUserProfile.twitter &&
      !image
    ) {
      errorToast("No changes made");
      return;
    }

    mutation.mutate({
      userId: currentUser.uid,
      profileData: formFields,
      imageFile: image,
    });
  };

  return (
    <div className="max-w-[80%] mx-auto py-24 text-white">
      <h2 className="text-2xl font-semibold mb-10">Profile</h2>
      {!isLoading ? (
        <ProfileImageUpload
          imagePreview={imagePreview}
          imageURL={currentUserProfile?.imageURL}
          onChange={handleImageChange}
        />
      ) : (
        <div className="w-36 h-36 rounded-full bg-gray-600 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form className="my-8 space-y-6" onSubmit={handleFormSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="Dean DeaconCo"
          name="displayName"
          value={formFields.displayName}
          onChange={handleChange}
        />
        <Input
          label="Bio"
          type="textarea"
          placeholder="Frontend Dev."
          name="bio"
          value={formFields.bio}
          onChange={handleChange}
        />
        <Input
          label="Tech Stacks"
          type="text"
          placeholder="Typescript, ReactJS, Tailwindcss, Bootstrap, CSS, HTML"
          name="techStacks"
          value={formFields.techStacks}
          onChange={handleChange}
        />
        <div className="grid grid-cols-20 md:grid-cols-12 sm:gap-24 md:gap-12 mb-2">
          <div className="col-span-5">
            <p className="block mb-3 text-sm font-sans font-medium text-text">
              Links
            </p>
            <SocialInput
              imgSrc={
                "https://www.porfolio.co/_next/image?url=%2Fimages%2Ficon-discord-framed.png&w=32&q=75"
              }
              label="Discord"
              name="discord"
              placeholder="Discord Username"
              value={formFields.discord}
              onChange={handleChange}
            />
            <SocialInput
              imgSrc={
                "https://www.porfolio.co/_next/image?url=%2Fimages%2Ficon-twitter-framed.png&w=32&q=75"
              }
              label="Twitter"
              name="twitter"
              placeholder="Twitter Username"
              value={formFields.twitter}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="bg-transparent rounded-lg border border-gray-700 text-white p-3 font-medium w-40"
          type="submit"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center w-full">
              <ClipLoader size={20} color={"#fff"} />
            </span>
          ) : (
            "Save changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;

const SocialInput = ({ imgSrc, label, ...otherProps }) => {
  return (
    <div className="flex mb-4">
      <div className="inline-flex items-center w-28 px-2 pr-3 text-sm text-gray-900 bg-gray-600 rounded-l-md border border-r-0 border-gray-600 select-none">
        <img src={imgSrc} className="w-8 h-8 mr-2" alt={label} />
        <p className="text-white font-medium">{label}</p>
      </div>
      <input
        maxLength={32}
        type="text"
        {...otherProps}
        className="rounded-none placeholder:text-text text-left rounded-r-lg bg-gray-700 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-600 p-2.5"
      />
    </div>
  );
};
