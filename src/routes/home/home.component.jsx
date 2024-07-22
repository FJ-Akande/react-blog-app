import { IoMdAdd } from "react-icons/io";
import Card from "../../components/card/card.component";

const Home = () => {
  return (
    <div className="bg-secondary min-h-screen text-white pt-24">
      {/* <div className="max-w-lg mx-auto">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search blogs..."
          className="w-full border border-gray-700 rounded-3xl bg-transparent outline-none py-2 px-4"
        />
      </div> */}
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
          <Card />
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
