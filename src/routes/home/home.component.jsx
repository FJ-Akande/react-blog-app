import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Card from "../../components/card/card.component";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-secondary min-h-screen text-white pt-24">
      {/* Filter based on Topic */}
      <div className="max-w-3xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Projects</h1>
          <button className="bg-primary p-3 rounded-lg flex items-center gap-2 font-medium">
            <span>
              <IoMdAdd className="text-2xl" />
            </span>
            Create Project
          </button>
        </div>
        <div className="my-10">
          <Card onClick={() => navigate("/details/1")} />
        </div>
        <button
          type="button"
          className="bg-primary my-4 py-2 text-center w-full rounded-lg font-medium"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
