import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../contexts/posts.context";
import Card from "../../components/card/card.component";
import Spinner from "../../components/spinner/spinner.component";
import { IoMdAdd } from "react-icons/io";
import { BeatLoader } from "react-spinners";
// import { infoToast } from "../../utils/toast/toast.utils";

const Home = () => {
  const navigate = useNavigate();

  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useContext(PostsContext);

  // useEffect(() => {
  //   infoToast("toast");
  // }, []);

  // if (!hasNextPage) {
  //   infoToast("No more posts!");
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
          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : error ? (
            <div className="font-medium text-red-500 text-center">
              Error fetching posts: {error.message}
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/details/${post.id}`)}
                />
              ))}
              {hasNextPage && (
                <button
                  type="button"
                  className="bg-primary my-4 py-2 text-center w-full rounded-lg font-medium h-10"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <span className="flex items-center justify-center w-full h-full">
                      <BeatLoader size={10} margin={2} color={"#fff"} />
                    </span>
                  ) : (
                    "Load More"
                  )}
                </button>
              )}
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
