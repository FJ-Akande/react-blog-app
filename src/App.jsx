import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";
import SignUp from "./routes/sign-up/sign-up.component";
import DetailPage from "./routes/detail-page/detail-page";
import CreateBlog from "./routes/create-blog/create-blog.component";
import PrivateRoute from "./utils/private-route/private-route.utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="create-account" element={<SignUp />} />
          <Route path="details/:id" element={<DetailPage />} />
          <Route
            path="create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route path="*" element={<Navigate to="/sign-in" replace />} /> */}
      </Routes>
    </>
  );
};

export default App;
