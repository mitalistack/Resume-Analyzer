import { useState } from "react";
import { keywordMatcher } from "../../utils/keywordMatcher";

const KeywordMatcher = ({ resumeText }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const data = keywordMatcher(resumeText, jobDescription);
      setResult(data);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl mt-8">

      <h2 className="text-2xl font-bold text-white mb-5">
        ATS Keyword Match
      </h2>

      <textarea
        rows={8}
        placeholder="Paste Job Description Here..."
        className="w-full rounded-lg bg-slate-700 text-white p-4 outline-none"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      <div className="w-full bg-slate-700 rounded-full h-4 mt-6">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${result?.matchPercentage || 0}%` }}
        ></div>
      </div>

      {result !== null && (
        <div className="mt-8">

          <h3
            className={`text-3xl font-bold mt-4 ${result.matchPercentage >= 80
              ? "text-green-400"
              : result.matchPercentage >= 50
                ? "text-yellow-400"
                : "text-red-400"
              }`}
          >
            ATS Score: {result.matchPercentage}%
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div>

              <h4 className="text-xl text-white mb-3">
                Found Keywords
              </h4>

              {result.foundKeywords.map((item, index) => (
                <p key={index} className="text-green-400">
                  ✔ {item}
                </p>
              ))}

            </div>

            <div>

              <h4 className="text-xl text-white mb-3">
                Missing Keywords
              </h4>

              {result.missingKeywords.map((item, index) => (
                <p key={index} className="text-red-400">
                  ✖ {item}
                </p>
              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default KeywordMatcher;