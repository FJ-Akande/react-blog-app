import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Input from "../../components/input/input.component";
import SkillCard from "../../components/skill-card/skill-card.component";
import { UserContext } from "../../contexts/user.context";
import { addNewPost } from "../../utils/firebase/firebase.utils";
import { errorToast, successToast } from "../../utils/toast/toast.utils";
import { ClipLoader } from "react-spinners";

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
  levelRequired: "Beginner",
};

const CreateBlog = () => {
  const { currentUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectOptions, setSelectOptions] = useState(initialOptions);
  const [levelOptions, setLevelOptions] = useState(initialLevelOptions);

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { mutate, isPending } = useMutation({
    mutationFn: addNewPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      successToast("Post published!");
      resetForm();
      navigate(`/details/${newPost.id}`);
    },
    onError: (error) => {
      console.log(error.message);
      errorToast(error.message);
    },
  });

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
        ? { ...option, isSelected: true }
        : { ...option, isSelected: false }
    );
    setLevelOptions(updatedOptions);

    const selectedOption = updatedOptions.find((option) => option.isSelected);
    setFormFields({
      ...formFields,
      levelRequired: selectedOption ? selectedOption.value : "",
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

    if (!formFields.skills.length && formFields.levelRequired !== "") {
      errorToast("Fill empty input field(s)");
      return;
    }

    if (formFields.skills.length > 3) {
      errorToast("Select three skills at most");
      return;
    }

    if (formFields.description.length < 100) {
      errorToast("Description is short, must be more than 100 characters");
      return;
    }

    const post = {
      ...formFields,
      authorId: currentUser.uid,
    };

    mutate(post);
  };

  return (
    <div className="min-h-screen bg-secondary text-text py-24">
      <div className="max-w-[92%] md:max-w-[80%] mx-auto">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {selectOptions.map((option) => (
                <SkillCard
                  option={option}
                  key={option.id}
                  onClick={() => handleCardClick(option.id)}
                  name="skill"
                  value={formFields.skills}
                />
              ))}
              <div
                className="bg-gray-800 rounded-xl text-text font-medium text-center text-sm flex flex-col items-center justify-center cursor-pointer py-4 md:py-0"
                onClick={() =>
                  (window.location.href =
                    "mailto:fortunatusakande@gmail.com?subject=Hello&body=I would like to contact you regarding...")
                }
              >
                <p>Recommend a new one?</p>
                <p>Contact support</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Level required:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
            className="bg-transparent rounded-lg border border-gray-700 text-white p-3 font-medium w-40"
            type="submit"
          >
            {isPending ? (
              <span className="flex items-center justify-center w-full">
                <ClipLoader size={20} color={"#fff"} />
              </span>
            ) : (
              "Create blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
