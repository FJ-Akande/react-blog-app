import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { errorToast } from "../../utils/toast/toast.utils";
import { ClipLoader } from "react-spinners";
import Input from "../../components/input/input.component";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetForm = () => setFormFields(defaultFormFields);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formFields;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setLoading(false);
      resetForm();
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorToast("Cannot login user, email already in use");
          break;
        default:
          errorToast(error.message.replace("Firebase: ", ""));
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 border border-gray-700 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h5 className="text-xl font-medium text-white dark:text-white">
            Sign in to our platform
          </h5>
          <Input
            label="Email"
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            id="email"
            value={formFields.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            id="password"
            value={formFields.password}
            onChange={handleChange}
          />
          <div className="flex items-start">
            <Input type={"checkbox"} />
            <Link
              to="/"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center w-full">
                <ClipLoader size={20} color={"#fff"} />
              </span>
            ) : (
              "Login to your account"
            )}
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/create-account"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
