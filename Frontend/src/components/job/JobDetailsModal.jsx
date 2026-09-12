import React from "react";

const JobDetailsModal = ({ job, onClose }) => {
    if (!job) return null;

    const getMatchStyle = (score) => {
        if (score >= 85) {
            return "bg-green-500/20 text-green-400 border-green-500/30";
        }

        if (score >= 70) {
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        }

        return "bg-red-500/20 text-red-400 border-red-500/30";
    };

    const handleApply = () => {
        if (job.sourceUrl) {
            window.open(job.sourceUrl, "_blank", "noopener,noreferrer");
        } else {
            alert(
                "This is a demo job listing. The real application link will be available when live job API integration is connected."
            );
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="p-6 border-b border-slate-700">

                    <div className="flex justify-between items-start gap-4">

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {job.title}
                            </h2>

                            <p className="text-gray-300 mt-1">
                                {job.company}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl transition"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                    </div>

                    {/* Job Info */}
                    <div className="flex flex-wrap gap-2 mt-4">

                        <span className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                            📍 {job.location}
                        </span>

                        <span className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                            {job.type}
                        </span>

                        <span className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                            {job.level}
                        </span>

                        <span className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                            {job.experience === 0
                                ? "No experience required"
                                : `${job.experience}+ Years`}
                        </span>

                        <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-sm">
                            Source: {job.source}
                        </span>

                    </div>

                </div>

                {/* Body */}
                <div className="p-6">

                    {/* Match Score */}
                    <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">

                        <div className="flex justify-between items-center gap-4">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Resume Match
                                </p>

                                <p className="text-3xl font-bold text-white mt-1">
                                    {job.matchScore}%
                                </p>
                            </div>

                            <span
                                className={`px-4 py-2 rounded-full border font-semibold ${getMatchStyle(
                                    job.matchScore
                                )}`}
                            >
                                {job.matchLabel}
                            </span>

                        </div>

                        {/* Match Breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Skill Match
                                </p>

                                <p className="text-green-400 font-semibold mt-1">
                                    {job.skillMatchScore ?? 0}%
                                </p>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Experience Fit
                                </p>

                                <p className="text-green-400 font-semibold mt-1">
                                    {job.experienceFitScore ?? 0}%
                                </p>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Role Relevance
                                </p>

                                <p className="text-green-400 font-semibold mt-1">
                                    {job.roleRelevanceScore ?? 0}%
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Description */}
                    <div className="mt-6">

                        <h3 className="text-lg font-semibold text-white">
                            Job Description
                        </h3>

                        <p className="text-gray-300 mt-2 leading-relaxed">
                            {job.description}
                        </p>

                    </div>

                    {/* Matching Skills */}
                    <div className="mt-6">

                        <h3 className="text-lg font-semibold text-green-400 mb-3">
                            ✓ Your Matching Skills
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {job.matchingSkills?.length > 0 ? (
                                job.matchingSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-green-500/20 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">
                                    No matching skills found.
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Missing Skills */}
                    <div className="mt-6">

                        <h3 className="text-lg font-semibold text-red-400 mb-3">
                            + Skills to Improve
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {job.missingSkills?.length > 0 ? (
                                job.missingSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-red-500/20 text-red-300 border border-red-500/20 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-green-400 text-sm">
                                    ✓ You have all required skills for this role.
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Required Skills */}
                    <div className="mt-6">

                        <h3 className="text-lg font-semibold text-white mb-3">
                            Required Skills
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {job.skills?.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">

                        <button
                            onClick={handleApply}
                            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Apply Now →
                        </button>

                        <button
                            onClick={onClose}
                            className="sm:w-32 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Close
                        </button>

                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        Job source: {job.source} • Application links will be
                        connected when live job APIs are integrated.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;