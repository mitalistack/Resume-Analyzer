const Dashboard = ({ atsScore }) => {

  const getJobs = () => {
    if (atsScore >= 90) {
      return [
        "Senior Frontend Developer",
        "React Developer",
        "UI Engineer",
      ];
    }

    if (atsScore >= 80) {
      return [
        "Frontend Developer",
        "Web Developer",
        "JavaScript Developer",
      ];
    }

    return [
      "Junior Frontend Developer",
      "Trainee Web Developer",
      "Intern - React Developer",
    ];
  };

  return (
    <section className="bg-slate-900 py-20 px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Resume Insights Dashboard
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {/* ATS Score */}
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl text-white font-semibold mb-4">
              ATS Score
            </h3>

            <p className="text-5xl font-bold text-green-400">
              {atsScore ? `${atsScore}%` : "--"}
            </p>
          </div>

          {/* Resume Strength */}
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl text-white font-semibold mb-4">
              Resume Strength
            </h3>

            <p className="text-3xl font-bold text-blue-400">
              {atsScore >= 90
                ? "Excellent"
                : atsScore >= 80
                ? "Good"
                : "Needs Improvement"}
            </p>
          </div>

          {/* Skills Found */}
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl text-white font-semibold mb-4">
              Skills Found
            </h3>

            <ul className="text-gray-300 space-y-2">
              <li>✔ React</li>
              <li>✔ JavaScript</li>
              <li>✔ HTML</li>
              <li>✔ CSS</li>
            </ul>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-xl text-white font-semibold mb-4">
              Recommended Jobs
            </h3>

            <div className="space-y-3">
              {getJobs().map((job, index) => (
                <div
                  key={index}
                  className="bg-slate-700 p-3 rounded-lg text-gray-300"
                >
                  {job}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Dashboard;