import { Link } from "react-router-dom";
import Input from "../../components/input/input.component";

const SignIn = () => {
  return (
    <div className="bg-secondary min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 border border-gray-700 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6">
          <h5 className="text-xl font-medium text-white dark:text-white">
            Sign in to our platform
          </h5>
          <Input
            label="Email"
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            id="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            id="password"
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
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
