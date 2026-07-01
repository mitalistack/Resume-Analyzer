const Hero = () => {
  return (
    <section className="bg-slate-950 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Upload Your Resume &
            <span className="text-blue-500"> Get Hired Faster</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Analyze your resume, improve ATS score and discover
            jobs that match your skills instantly.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 px-6 py-3 rounded-lg">
              Upload Resume
            </button>

            <button className="border border-gray-600 px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl w-96 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">
              Resume Analysis
            </h3>

            <div className="space-y-4">
              <div>
                <p>ATS Score</p>
                <div className="h-3 bg-gray-700 rounded-full">
                  <div className="h-3 w-[85%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <p>✔ React.js</p>
              <p>✔ JavaScript</p>
              <p>✔ HTML/CSS</p>
              <p>✔ Problem Solving</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;