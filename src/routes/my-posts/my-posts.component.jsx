import { useContext, useEffect } from "react";
import { PostsContext } from "../../contexts/posts.context";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Card from "../../components/card/card.component";

const MyPosts = () => {
  const navigate = useNavigate();
  const { posts, isLoading, isError } = useContext(PostsContext);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-24 max-w-[60%] mx-auto text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <button
          className="bg-primary p-3 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => navigate("/create-blog")}
        >
          <span>
            <IoMdAdd className="text-2xl" />
          </span>
          Add new
        </button>
      </div>
      <div className="mt-10 space-y-5">
        {posts &&
          posts.map((post) => (
            <Card
              key={post.id}
              post={post}
              onClick={() => navigate("/details/1")}
            />
          ))}
        {/* <Card onClick={() => navigate("/details/1")} />
        <Card onClick={() => navigate("/details/1")} /> */}
      </div>
    </div>
  );
};

export default MyPosts;
