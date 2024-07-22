import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { errorToast } from "../../utils/toast/toast.utils";
import Input from "../../components/input/input.component";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const navigate = useNavigate();

  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { displayName, email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      errorToast("passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setLoading(false);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorToast("Cannot create user, email already in use");
          break;
        case "auth/weak-password":
          errorToast("Password should be at least 6 characters");
          break;
        case "auth/invalid-email":
          errorToast("Invalid email address");
          break;
        default:
          errorToast(error.message.replace("Firebase: ", ""));
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-4 border border-gray-700 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h5 className="text-xl font-medium text-white dark:text-white">
            Create account
          </h5>
          <Input
            label="Display Name"
            type="text"
            placeholder="John Doe"
            name="displayName"
            id="displayName"
            value={formFields.displayName}
            onChange={handleChange}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            name="confirmPassword"
            id="confirmPassword"
            value={formFields.confirmPassword}
            onChange={handleChange}
          />
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
              "Create account"
            )}
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already a user?{" "}
            <Link
              to="/sign-in"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
