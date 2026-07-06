const JobMatchExplanation = ({ analysis }) => {
  const missing = analysis?.missingKeywords || [];
  const matched = analysis?.matchedKeywords || [];
  const atsScore = analysis?.atsScore || 0;

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-6">
      
      <h2 className="text-2xl font-bold text-white mb-4">
        Why this score?
      </h2>

      {/* Score summary */}
      <p className="text-gray-300 mb-4">
        Your resume scored <span className="text-green-400 font-bold">{atsScore}%</span> based on keyword match, skills relevance and experience alignment.
      </p>

      {/* Positive points */}
      <div className="mb-5">
        <h3 className="text-green-400 font-semibold mb-2">
          ✔ Strong Matches
        </h3>

        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? (
            matched.map((item, i) => (
              <span key={i} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No strong matches found</p>
          )}
        </div>
      </div>

      {/* Negative points */}
      <div>
        <h3 className="text-red-400 font-semibold mb-2">
          ❌ Missing Keywords
        </h3>

        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? (
            missing.map((item, i) => (
              <span key={i} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No missing keywords 🎉</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default JobMatchExplanation;