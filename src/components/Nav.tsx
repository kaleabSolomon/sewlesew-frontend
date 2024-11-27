const Nav = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 sm:px-28 px-8 py-4 bg-transparent text-md flex items-center justify-between text-white">
      <div className="flex gap-x-8 items-center">
        <h1 className="text-xl  font-inter text-customTeal ">
          Kena<span className="font-bold">Lib</span>
        </h1>
        <h2>Home</h2>
        <h2>Disasters</h2>
        <h2>Charity</h2>
        <h2>Events</h2>
      </div>
      <div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Nav;
