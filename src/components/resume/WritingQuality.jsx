const WritingQuality = ({ writingAnalysis }) => {
  if (!writingAnalysis) return null;

  const {
    writingScore,
    actionVerbs,
    weakVerbs,
    genericPhrases,
    achievements,
  } = writingAnalysis;

  return (
    <div className="mt-10 rounded-2xl bg-slate-800 p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-white mb-8">
        Writing Quality
      </h2>

      <div className="flex items-center justify-between mb-6">

        <span className="text-gray-300 text-lg">
          Writing Score
        </span>

        <span
          className={`text-3xl font-bold ${
            writingScore >= 90
              ? "text-green-400"
              : writingScore >= 75
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {writingScore}%
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <h3 className="text-green-400 font-semibold mb-3">
            Strong Action Verbs
          </h3>

          {actionVerbs.length ? (
            actionVerbs.map((verb, index) => (
              <p key={index} className="text-gray-300">
                ✔ {verb}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No strong action verbs found.</p>
          )}
        </div>

        <div>
          <h3 className="text-red-400 font-semibold mb-3">
            Weak Verbs
          </h3>

          {weakVerbs.length ? (
            weakVerbs.map((verb, index) => (
              <p key={index} className="text-gray-300">
                ✖ {verb}
              </p>
            ))
          ) : (
            <p className="text-green-400">None detected 🎉</p>
          )}
        </div>

        <div>
          <h3 className="text-yellow-400 font-semibold mb-3">
            Generic AI-style Phrases
          </h3>

          {genericPhrases.length ? (
            genericPhrases.map((phrase, index) => (
              <p key={index} className="text-gray-300">
                ⚠ {phrase}
              </p>
            ))
          ) : (
            <p className="text-green-400">None detected 🎉</p>
          )}
        </div>

        <div>
          <h3 className="text-cyan-400 font-semibold mb-3">
            Quantified Achievements
          </h3>

          {achievements.length ? (
            achievements.map((item, index) => (
              <p key={index} className="text-gray-300">
                📈 {item}
              </p>
            ))
          ) : (
            <p className="text-red-400">
              No quantified achievements found.
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default WritingQuality;