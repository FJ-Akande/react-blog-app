const Home = () => {
  return (
    <div className="bg-secondary min-h-screen text-white pt-24">
      <div className="max-w-lg mx-auto">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search blogs..."
          className="w-full border border-gray-700 rounded-3xl bg-transparent outline-none py-2 px-4"
        />
      </div>
      <p>Home</p>
    </div>
  );
};

export default Home;
