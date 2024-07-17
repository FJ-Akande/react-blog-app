import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation.component";
import Home from "./routes/home/home.component";
import Blogs from "./routes/blogs/blogs.component";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
