const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-950 text-white">
      <h1 className="text-2xl font-bold text-blue-500">
        ResumeAI
      </h1>

      <div className="flex gap-8">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Jobs</a>
        <a href="#">Contact</a>
      </div>

      <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;