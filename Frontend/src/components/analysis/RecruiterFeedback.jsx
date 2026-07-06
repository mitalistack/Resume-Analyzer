const RecruiterFeedback = ({ analysis }) => {

  const matched = analysis?.matchedKeywords || [];
  const missing = analysis?.missingKeywords || [];

  return (
    <div className="mt-10 bg-slate-800 p-6 rounded-xl">

      <h2 className="text-white text-2xl font-bold mb-4">
        Recruiter Feedback
      </h2>

      {/* ✔ GOOD */}
      <h3 className="text-green-400 font-semibold mb-2">
        Strong Points
      </h3>

      {matched.length > 0 ? (
        matched.map((item, i) => (
          <p key={i} className="text-gray-300">
            ✔ {item}
          </p>
        ))
      ) : (
        <p className="text-gray-400">No strong matches</p>
      )}

      <br />

      {/* ❌ MISSING */}
      <h3 className="text-red-400 font-semibold mb-2">
        Missing Points
      </h3>

      {missing.length > 0 ? (
        missing.map((item, i) => (
          <p key={i} className="text-gray-300">
            ❌ Add {item}
          </p>
        ))
      ) : (
        <p className="text-gray-400">Nothing missing 🎉</p>
      )}

    </div>
  );
};

export default RecruiterFeedback;