import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Target,
  Lightbulb,
} from "lucide-react";
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

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Strong Match";
    if (score >= 50) return "Moderate Match";
    return "Low Match";
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mt-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-500/10 p-2 rounded-lg">
          <Search className="w-6 h-6 text-blue-400" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          ATS Keyword Match
        </h2>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        Compare your resume against a job description to identify
        matching and missing keywords.
      </p>


      {/* Job Description */}
      <textarea
        rows={8}
        placeholder="Paste the job description here..."
        className="w-full rounded-xl bg-slate-700 border border-slate-600
        text-white p-4 outline-none resize-none
        focus:border-blue-500 transition"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />


      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading || !jobDescription.trim()}
        className="mt-5 flex items-center gap-2
        bg-blue-600 hover:bg-blue-700
        px-6 py-3 rounded-lg text-white font-medium
        transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Target className="w-5 h-5" />

        {loading ? "Analyzing..." : "Analyze Match"}
      </button>


      {/* Results */}
      {result !== null && (
        <div className="mt-8">

          {/* Overall Score */}
          <div className="bg-slate-700 rounded-xl p-6">

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-400 text-sm">
                  Overall Job Match
                </p>

                <p
                  className={`text-4xl font-bold mt-1 ${getScoreColor(
                    result.matchPercentage
                  )}`}
                >
                  {result.matchPercentage}%
                </p>

                <p
                  className={`text-sm font-medium mt-1 ${getScoreColor(
                    result.matchPercentage
                  )}`}
                >
                  {getScoreLabel(result.matchPercentage)}
                </p>
              </div>

              <Target
                className={`w-10 h-10 ${getScoreColor(
                  result.matchPercentage
                )}`}
              />
            </div>

            {/* Progress */}
            <div className="w-full bg-slate-600 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${result.matchPercentage}%`,
                }}
              />
            </div>

          </div>


          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-4 mt-5">

            <div className="bg-slate-700 rounded-xl p-5">

              <p className="text-gray-400 text-sm">
                Technical Skill Match
              </p>

              <div className="flex items-center justify-between mt-2">

                <p
                  className={`text-2xl font-bold ${getScoreColor(
                    result.skillMatchPercentage
                  )}`}
                >
                  {result.skillMatchPercentage}%
                </p>

                <span className="text-gray-400 text-sm">
                  Skills
                </span>

              </div>

              <div className="w-full bg-slate-600 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${result.skillMatchPercentage}%`,
                  }}
                />
              </div>

            </div>


            <div className="bg-slate-700 rounded-xl p-5">

              <p className="text-gray-400 text-sm">
                General Keyword Match
              </p>

              <div className="flex items-center justify-between mt-2">

                <p
                  className={`text-2xl font-bold ${getScoreColor(
                    result.generalKeywordPercentage
                  )}`}
                >
                  {result.generalKeywordPercentage}%
                </p>

                <span className="text-gray-400 text-sm">
                  Keywords
                </span>

              </div>

              <div className="w-full bg-slate-600 rounded-full h-2 mt-3">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{
                    width: `${result.generalKeywordPercentage}%`,
                  }}
                />
              </div>

            </div>

          </div>


          {/* Keywords */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* Found */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <CheckCircle className="w-5 h-5 text-green-400" />

                <h3 className="text-lg font-semibold text-white">
                  Matching Keywords
                </h3>

              </div>

              {result.foundKeywords?.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {result.foundKeywords.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full
                      bg-green-500/10 border border-green-500/20
                      text-green-300 text-sm"
                    >
                      {item}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No matching keywords found.
                </p>
              )}

            </div>


            {/* Missing */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <XCircle className="w-5 h-5 text-red-400" />

                <h3 className="text-lg font-semibold text-white">
                  Missing Keywords
                </h3>

              </div>

              {result.missingKeywords?.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {result.missingKeywords.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full
                      bg-red-500/10 border border-red-500/20
                      text-red-300 text-sm"
                    >
                      {item}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-green-400 text-sm">
                  Great! No important missing keywords detected.
                </p>
              )}

            </div>

          </div>


          {/* Improvement Tip */}
          {result.missingKeywords?.length > 0 && (
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">

              <div className="flex items-start gap-3">

                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />

                <div>

                  <h3 className="text-white font-semibold">
                    Improvement Tip
                  </h3>

                  <p className="text-gray-300 text-sm mt-1">
                    Consider naturally adding relevant missing
                    keywords to your resume where they accurately
                    represent your skills or experience.
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default KeywordMatcher;