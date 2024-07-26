import Input from "../../components/input/input.component";
import SkillCard from "../../components/skill-card/skill-card.component";

const selectOptions = [
  {
    id: 1,
    label: "Frontend",
    icon: "https://www.porfolio.co/images/icon-frontend.png",
    // isSelected: false,
  },
  {
    id: 2,
    label: "Backend",
    icon: "https://www.porfolio.co/images/icon-backend.png",
    // isSelected: false,
  },
  {
    id: 3,
    label: "UI/UX",
    icon: "	https://www.porfolio.co/images/icon-uiux.png",
    // isSelected: false,
  },
  {
    id: 4,
    label: "Scripts",
    icon: "https://www.porfolio.co/images/icon-wireframe.png",
    // isSelected: false,
  },
  {
    id: 5,
    label: "Wireframe",
    icon: "https://www.porfolio.co/images/icon-wireframe.png",
    // isSelected: false,
  },
  {
    id: 6,
    label: "Just Code",
    icon: "https://www.porfolio.co/images/icon-just-code.png",
    // isSelected: false,
  },
  {
    id: 7,
    label: "Just Talk",
    icon: "https://www.porfolio.co/images/icon-just-talk.png",
    // isSelected: false,
  },
];

const levelOptions = [
  {
    id: 1,
    label: "Beginner",
    icon: "https://www.porfolio.co/images/icon-beginner.png",
    isSelected: true,
  },
  {
    id: 2,
    label: "Intermediate",
    icon: "https://www.porfolio.co/images/icon-intermediate.png",
    isSelected: false,
  },
  {
    id: 3,
    label: "Expert",
    icon: "https://www.porfolio.co/images/icon-expert.png",
    isSelected: false,
  },
];

const CreateBlog = () => {
  return (
    <div className="min-h-screen bg-secondary text-text py-24">
      <div className="max-w-[80%] mx-auto">
        <h1 className="font-semibold text-2xl text-white">Create blog</h1>
        <form className="my-10 space-y-10">
          <Input label="Title" type="text" placeholder="Enter blog title" />
          <Input
            label="Description"
            type="textarea"
            placeholder="Enter project description"
          />
          <div>
            <p className="text-sm font-medium mb-3">I need help with: </p>
            <div className="grid grid-cols-4 gap-5">
              {selectOptions.map((option) => (
                <SkillCard option={option} key={option.id} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Level required:</p>
            <div className="grid grid-cols-4 gap-5">
              {levelOptions.map((option) => (
                <SkillCard option={option} key={option.id} />
              ))}
            </div>
          </div>
          <button
            className="bg-transparent rounded-lg border border-gray-700 text-white p-3 font-medium"
            type="submit"
          >
            Create blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
