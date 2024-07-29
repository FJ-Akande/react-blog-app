import Input from "../../components/input/input.component";

const Profile = () => {
  return (
    <div className="max-w-[80%] mx-auto py-24 text-white">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <form className="my-10 space-y-6">
        <Input label="Name" type="text" placeholder="Dean Deanco" />
        <Input label="Bio" type="textarea" placeholder="Frontend Dev." />
        <Input
          label="Tech Stacks"
          type="text"
          placeholder="Typescript, ReactJS, Tailwindcss, Bootstrap, CSS, HTML"
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
              name="discordUsername"
              placeholder="Discord Username"
            />
            <SocialInput
              imgSrc={
                "https://www.porfolio.co/_next/image?url=%2Fimages%2Ficon-twitter-framed.png&w=32&q=75"
              }
              label="Twitter"
              name="twitterUsername"
              placeholder="Twitter Username"
            />
          </div>
        </div>
        <button
          className="bg-transparent rounded-lg border border-gray-700 text-white p-3 font-medium"
          type="submit"
        >
          Save Changes
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
