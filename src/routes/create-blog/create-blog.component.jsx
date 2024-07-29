import { useState } from "react";
import Input from "../../components/input/input.component";
import SkillCard from "../../components/skill-card/skill-card.component";
import { successToast } from "../../utils/toast/toast.utils";

const initialOptions = [
  {
    id: 1,
    label: "Frontend",
    icon: "https://www.porfolio.co/images/icon-frontend.png",
    isSelected: false,
    value: "Frontend",
  },
  {
    id: 2,
    label: "Backend",
    icon: "https://www.porfolio.co/images/icon-backend.png",
    isSelected: false,
    value: "Backend",
  },
  {
    id: 3,
    label: "UI/UX",
    icon: "	https://www.porfolio.co/images/icon-uiux.png",
    isSelected: false,
    value: "UI/UX",
  },
  {
    id: 4,
    label: "Scripts",
    icon: "https://www.porfolio.co/images/icon-wireframe.png",
    isSelected: false,
    value: "Scripts",
  },
  {
    id: 5,
    label: "Wireframe",
    icon: "https://www.porfolio.co/images/icon-wireframe.png",
    isSelected: false,
    value: "Wireframe",
  },
  {
    id: 6,
    label: "Just Code",
    icon: "https://www.porfolio.co/images/icon-just-code.png",
    isSelected: false,
    value: "Just Code",
  },
  {
    id: 7,
    label: "Just Talk",
    icon: "https://www.porfolio.co/images/icon-just-talk.png",
    isSelected: false,
    value: "Just Talk",
  },
];

const initialLevelOptions = [
  {
    id: 1,
    label: "Beginner",
    icon: "https://www.porfolio.co/images/icon-beginner.png",
    isSelected: true,
    value: "Beginner",
  },
  {
    id: 2,
    label: "Intermediate",
    icon: "https://www.porfolio.co/images/icon-intermediate.png",
    isSelected: false,
    value: "Intermediate",
  },
  {
    id: 3,
    label: "Expert",
    icon: "https://www.porfolio.co/images/icon-expert.png",
    isSelected: false,
    value: "Expert",
  },
];

const defaultFormFields = {
  title: "",
  description: "",
  skills: [],
  levelRequired: "",
};

const CreateBlog = () => {
  const [selectOptions, setSelectOptions] = useState(initialOptions);
  const [levelOptions, setLevelOptions] = useState(initialLevelOptions);

  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetForm = () => {
    setFormFields(defaultFormFields);
    setSelectOptions(initialOptions);
    setLevelOptions(initialLevelOptions);
  };

  const handleCardClick = (id) => {
    const updatedOptions = selectOptions.map((option) =>
      option.id === id ? { ...option, isSelected: !option.isSelected } : option
    );
    setSelectOptions(updatedOptions);

    const selectedSkills = updatedOptions
      .filter((option) => option.isSelected)
      .map((option) => option.value);

    setFormFields({
      ...formFields,
      skills: selectedSkills,
    });
  };

  const handleLevelClick = (id) => {
    const updatedOptions = levelOptions.map((option) =>
      option.id === id
        ? { ...option, isSelected: !option.isSelected }
        : { ...option, isSelected: false }
    );
    setLevelOptions(updatedOptions);

    const selectedOption = updatedOptions.find((option) => option.id === id);
    setFormFields({
      ...formFields,
      levelRequired: selectedOption.value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    successToast("Post published!");
    resetForm();
  };

  return (
    <div className="min-h-screen bg-secondary text-text py-24">
      <div className="max-w-[80%] mx-auto">
        <h1 className="font-semibold text-2xl text-white">Create blog</h1>
        <form className="my-10 space-y-10" onSubmit={handleFormSubmit}>
          <Input
            label="Title"
            type="text"
            placeholder="Enter blog title"
            name="title"
            value={formFields.title}
            onChange={handleChange}
          />
          <Input
            label="Description"
            type="textarea"
            placeholder="Enter project description"
            name="description"
            value={formFields.description}
            onChange={handleChange}
          />
          <div>
            <p className="text-sm font-medium mb-3">I need help with: </p>
            <div className="grid grid-cols-4 gap-5">
              {selectOptions.map((option) => (
                <SkillCard
                  option={option}
                  key={option.id}
                  onClick={() => handleCardClick(option.id)}
                  name="skill"
                  value={formFields.skills}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Level required:</p>
            <div className="grid grid-cols-4 gap-5">
              {levelOptions.map((option) => (
                <SkillCard
                  option={option}
                  key={option.id}
                  onClick={() => handleLevelClick(option.id)}
                  name="levelRequired"
                  value={formFields.levelRequired}
                />
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
