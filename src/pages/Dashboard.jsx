import Suggestions from "../components/resume/Suggestions";
import KeywordMatcher from "../components/resume/KeywordMatcherPanel";
import WritingQuality from "../components/resume/WritingQuality";
import JobMatchExplanation from "../components/analysis/JobMatchExplanation";
import RecruiterFeedback from "../components/analysis/RecruiterFeedback";
import { FaChartLine, FaMedal } from "react-icons/fa";

const getLabel = (score) => {
  if (score >= 85) return "High Match";
  if (score >= 70) return "Moderate Match";
  return "Low Match";
};

const Dashboard = ({ analysis }) => {
  const atsScore = analysis?.atsScore || 0;

  const breakdown = analysis?.breakdown || analysis?.scoreBreakdown || {};

  const breakdownItems = [
    { label: "Keyword Match", value: breakdown.keywordMatch || 0, max: 100 },
    { label: "Skills Match", value: breakdown.skillsMatch || 0, max: 100 },
    { label: "Experience Fit", value: breakdown.experienceFit || 0, max: 100 },
    { label: "Resume Structure", value: breakdown.resumeStructure || 0, max: 100 },
    { label: "Readability", value: breakdown.readability || 0, max: 100 },
  ];

  return (
    <section className="bg-slate-900 py-20 px-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Resume Insights Dashboard
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {/* ATS SCORE */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                ATS Score
              </h3>

              <FaChartLine className="text-3xl text-green-400" />
            </div>

            <p className="mt-6 text-6xl font-extrabold text-green-400">
              {atsScore ? `${atsScore}%` : "--"}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {getLabel(atsScore)}
            </p>

            <div className="mt-5 h-2 w-full rounded-full bg-slate-700">
              <div
                className="h-full bg-green-400 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(atsScore, 100)}%`,
                }}
              />
            </div>

          </div>

          {/* RESUME STRENGTH */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                Resume Strength
              </h3>

              <FaMedal className="text-3xl text-yellow-400" />
            </div>

            <div className="mt-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-block
                ${atsScore >= 90
                  ? "bg-green-500/20 text-green-400"
                  : atsScore >= 80
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                {atsScore >= 90
                  ? "Excellent"
                  : atsScore >= 80
                    ? "Good"
                    : "Needs Improvement"}
              </span>
            </div>

          </div>

          {/* SKILLS */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl text-white font-semibold mb-4">
              Skills Found
            </h3>

            <div className="flex flex-wrap gap-2">
              {analysis?.skills?.length > 0 ? (
                analysis.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-700 text-gray-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No skills detected</p>
              )}
            </div>
          </div>

          {/* JOBS */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl text-white font-semibold mb-4">
              Recommended Jobs
            </h3>

            <div className="space-y-2">
              {analysis?.recommendedJobs?.length > 0 ? (
                analysis.recommendedJobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-slate-700 p-3 rounded-lg text-gray-300"
                  >
                    💼 {job}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No recommendations</p>
              )}
            </div>
          </div>

          <Suggestions suggestions={analysis?.suggestions || []} />
        </div>

        {/* BREAKDOWN */}
        <div className="mt-10 rounded-2xl bg-slate-800 p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-white mb-8">
            ATS Score Breakdown
          </h2>

          {breakdownItems.map((item) => (
            <div key={item.label} className="mb-6">

              <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-medium">
                  {item.label}
                </span>

                <span className="text-white font-semibold">
                  {item.value}/{item.max}
                </span>
              </div>

              <div className="h-3 bg-slate-700 rounded-full">
                <div
                  className="h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${(item.value / item.max) * 100}%`,
                  }}
                />
              </div>

            </div>
          ))}

        </div>

        <WritingQuality writingAnalysis={analysis?.writingAnalysis} />

        <KeywordMatcher resumeText={analysis?.rawText || ""} />

        <JobMatchExplanation analysis={analysis} />

        <RecruiterFeedback analysis={analysis} />

      </div>
    </section>
  );
};

export default Dashboard;