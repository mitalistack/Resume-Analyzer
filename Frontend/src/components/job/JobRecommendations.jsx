import React, { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

const JobRecommendations = ({ jobs }) => {
    const [selectedJob, setSelectedJob] = useState(null);

    if (!jobs || jobs.length === 0) {
        return (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Recommended Jobs
                </h2>

                <p className="text-gray-400">
                    No job recommendations found.
                </p>
            </div>
        );
    }

    const getMatchStyle = (score) => {
        if (score >= 85) {
            return "bg-green-500/20 text-green-400 border-green-500/30";
        }

        if (score >= 70) {
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        }

        return "bg-red-500/20 text-red-400 border-red-500/30";
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">

            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Recommended Jobs
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        Jobs ranked based on your resume skills and experience.
                    </p>
                </div>

                <span className="text-sm text-gray-400">
                    {jobs.length} opportunities
                </span>
            </div>

            {/* Job List */}
            <div className="space-y-5">

                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-slate-700 rounded-xl p-5 border border-slate-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-start gap-4">

                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {job.title}
                                </h3>

                                <p className="text-gray-300 mt-1">
                                    {job.company}
                                </p>
                            </div>

                            {/* Match Score */}
                            <div
                                className={`px-3 py-2 rounded-lg border font-bold text-sm whitespace-nowrap ${getMatchStyle(
                                    job.matchScore
                                )}`}
                            >
                                {job.matchScore}% {job.matchLabel}
                            </div>

                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-400 mt-3">
                            {job.description}
                        </p>

                        {/* Job Information */}
                        <div className="flex flex-wrap gap-2 mt-4">

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                📍 {job.location}
                            </span>

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.type}
                            </span>

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.level}
                            </span>

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.experience === 0
                                    ? "No experience required"
                                    : `${job.experience}+ Years`}
                            </span>

                            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-sm">
                                Source: {job.source}
                            </span>

                        </div>

                        {/* Matching Skills */}
                        <div className="mt-5">

                            <h4 className="text-green-400 font-medium mb-2">
                                ✓ Matching Skills
                            </h4>

                            <div className="flex flex-wrap gap-2">

                                {job.matchingSkills?.length > 0 ? (
                                    job.matchingSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        No matching skills found
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* Missing Skills */}
                        <div className="mt-5">

                            <h4 className="text-red-400 font-medium mb-2">
                                + Skills to Improve
                            </h4>

                            <div className="flex flex-wrap gap-2">

                                {job.missingSkills?.length > 0 ? (
                                    job.missingSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-green-400 text-sm font-medium">
                                        ✓ You have all required skills
                                    </span>
                                )}

                            </div>
                        </div>

                        {/* Match Breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Skill Match
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    {job.skillMatchScore ?? 0}%
                                </p>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Experience Fit
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    {job.experienceFitScore ?? 0}%
                                </p>
                            </div>

                            <div className="bg-slate-800 rounded-lg p-3">
                                <p className="text-gray-400 text-xs">
                                    Role Relevance
                                </p>

                                <p className="text-white font-semibold mt-1">
                                    {job.roleRelevanceScore ?? 0}%
                                </p>
                            </div>

                        </div>

                        {/* Button */}
                        <button
                            onClick={() => setSelectedJob(job)}
                            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition py-2.5 rounded-lg font-semibold text-white"
                        >
                            View Job Details →
                        </button>

                    </div>
                ))}

            </div>

            {/* Job Details Modal */}
            <JobDetailsModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

        </div>
    );
};

export default JobRecommendations;