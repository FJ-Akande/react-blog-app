import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../contexts/posts.context";
import Card from "../../components/card/card.component";
import { IoMdAdd } from "react-icons/io";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { posts, isLoading, error } = useContext(PostsContext);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error fetching posts: {error.message}</div>;
  // }

  return (
    <div className="min-h-screen text-white py-24">
      <div className="max-w-3xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Projects</h1>
          <button
            className="bg-primary p-3 rounded-lg flex items-center gap-2 font-medium"
            onClick={() => navigate("/create-blog")}
          >
            <span>
              <IoMdAdd className="text-2xl" />
            </span>
            Create Project
          </button>
        </div>
        <div className="my-10 space-y-6">
          {/* <Card onClick={() => navigate("/details/1")} post={"loading"} /> */}
          {isLoading ? (
            <div className="font-medium text-center">Loading...</div>
          ) : error ? (
            <div className="font-medium text-red-500 text-center">
              Error fetching posts: {error.message}
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Card key={post.id} post={post} />
              ))}
              <button
                type="button"
                className="bg-primary my-4 py-2 text-center w-full rounded-lg font-medium h-10"
                onClick={() => setLoading(!loading)}
              >
                {loading ? (
                  <span className="flex items-center justify-center w-full h-full">
                    <BeatLoader size={10} margin={2} color={"#fff"} />
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            </>
          ) : (
            <div className="font-medium text-sm text-center">
              No posts available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
