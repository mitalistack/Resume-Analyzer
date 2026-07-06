const Features = () => {
  const features = [
    {
      icon: "📊",
      title: "ATS Score",
      desc: "Get an instant ATS compatibility score for your resume."
    },
    {
      icon: "📝",
      title: "Resume Analysis",
      desc: "Identify strengths, weaknesses and missing sections."
    },
    {
      icon: "💼",
      title: "Job Matching",
      desc: "Find jobs that best match your skills and experience."
    }
  ];

  return (
    <section className="bg-slate-950 py-20 px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Choose ResumeAI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:scale-105 transition duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>

              <h3 className="text-white text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;