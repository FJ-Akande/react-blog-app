import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../utils/firebase/firebase.utils";
import Input from "../../components/input/input.component";
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
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentUserProfile) {
      setFormFields({
        displayName: currentUserProfile.displayName || "",
        bio: currentUserProfile.bio || "",
        techStacks: currentUserProfile.techStacks || "",
        discord: currentUserProfile.discord || "",
        twitter: currentUserProfile.twitter || "",
      });
    }
  }, [currentUserProfile]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", currentUser.uid]);
      setLoading(false);
      successToast("Profile updated");
    },
    onError: (error) => {
      queryClient.invalidateQueries(["userProfile", currentUser.uid]);
      setLoading(false);
      errorToast(error.message);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (
      formFields.displayName === currentUserProfile.displayName &&
      formFields.bio === currentUserProfile.bio &&
      formFields.techStacks === currentUserProfile.techStacks &&
      formFields.discord === currentUserProfile.discord &&
      formFields.twitter === currentUserProfile.twitter
    ) {
      errorToast("No changes made");
      setLoading(false);
      return;
    }

    mutation.mutate({ userId: currentUser.uid, profileData: formFields });

    // try {
    //   await updateUserProfile(currentUser.uid, formFields);
    //   window.location.reload();
    //   setLoading(false);
    //   successToast("Profile updated");
    // } catch (error) {
    //   console.error("Error updating profile: ", error);
    //   const updatedProfile = await getUserProfile(currentUser.uid);
    //   setFormFields(updatedProfile);
    //   setLoading(false);
    //   errorToast(error.message);
    // }
  };

  return (
    <div className="max-w-[80%] mx-auto py-24 text-white">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <form className="my-10 space-y-6" onSubmit={handleFormSubmit}>
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
          {loading ? (
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
