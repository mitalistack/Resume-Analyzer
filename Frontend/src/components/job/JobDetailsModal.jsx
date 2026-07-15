import React from "react";

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 w-full max-w-2xl rounded-2xl p-6 border border-slate-700">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {job.title}
            </h2>

            <p className="text-gray-400 mt-1">
              {job.company}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Match Score */}
        <div className="mt-6">
          <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
            {job.matchScore}% Match
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white">
            Job Description
          </h3>

          <p className="text-gray-300 mt-2">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Required Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetailsModal;