import {
  CheckCircle,
  AlertTriangle,
  PenLine,
} from "lucide-react";

const WritingQuality = ({ writingAnalysis }) => {
  if (!writingAnalysis) {
    return null;
  }

  const {
    score = 0,
    label = "Not Analyzed",
    actionVerbScore = 0,
    metricsScore = 0,
    readabilityScore = 0,
    passiveVoiceScore = 0,
    weakPhraseCount = 0,
    strengths = [],
    improvements = [],
  } = writingAnalysis;

  const getScoreColor = (value) => {
    if (value >= 85) return "text-green-400";
    if (value >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mt-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Writing Quality
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            ATS-focused analysis of your resume writing
          </p>
        </div>

        <PenLine className="w-7 h-7 text-blue-400" />
      </div>


      {/* Main Score */}
      <div className="bg-slate-700 rounded-xl p-6 text-center mb-6">

        <p className="text-gray-400 text-sm">
          Overall Writing Quality
        </p>

        <div
          className={`text-5xl font-bold mt-2 ${getScoreColor(
            score
          )}`}
        >
          {score}%
        </div>

        <p
          className={`font-semibold mt-2 ${getScoreColor(
            score
          )}`}
        >
          {label}
        </p>

      </div>


      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-slate-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Action Verbs
          </p>

          <p
            className={`text-2xl font-bold mt-1 ${getScoreColor(
              actionVerbScore
            )}`}
          >
            {actionVerbScore}%
          </p>
        </div>


        <div className="bg-slate-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Quantifiable Results
          </p>

          <p
            className={`text-2xl font-bold mt-1 ${getScoreColor(
              metricsScore
            )}`}
          >
            {metricsScore}%
          </p>
        </div>


        <div className="bg-slate-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Readability
          </p>

          <p
            className={`text-2xl font-bold mt-1 ${getScoreColor(
              readabilityScore
            )}`}
          >
            {readabilityScore}%
          </p>
        </div>


        <div className="bg-slate-700 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Active Voice
          </p>

          <p
            className={`text-2xl font-bold mt-1 ${getScoreColor(
              passiveVoiceScore
            )}`}
          >
            {passiveVoiceScore}%
          </p>
        </div>

      </div>


      {/* Weak Phrases */}
      {weakPhraseCount > 0 && (
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />

            <p className="text-yellow-300 font-semibold">
              Weak phrases detected
            </p>
          </div>

          <p className="text-gray-300 text-sm mt-2">
            {weakPhraseCount} weak resume phrase
            {weakPhraseCount > 1 ? "s" : ""} detected.
            Replace them with specific achievements.
          </p>

        </div>
      )}


      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="mt-6">

          <h3 className="text-lg font-semibold text-white mb-3">
            Strengths
          </h3>

          <div className="space-y-2">

            {strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />

                <p className="text-gray-300 text-sm">
                  {strength}
                </p>
              </div>
            ))}

          </div>

        </div>
      )}


      {/* Improvements */}
      {improvements.length > 0 && (
        <div className="mt-6">

          <h3 className="text-lg font-semibold text-white mb-3">
            Improvements
          </h3>

          <div className="space-y-3">

            {improvements.map((improvement, index) => (
              <div
                key={index}
                className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
              >
                <p className="text-gray-300 text-sm">
                  💡 {improvement}
                </p>
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default WritingQuality;