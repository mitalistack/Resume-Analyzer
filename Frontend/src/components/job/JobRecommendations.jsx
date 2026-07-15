import React, { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

const JobRecommendations = ({ jobs }) => {
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

    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
                Recommended Jobs
            </h2>

            <div className="space-y-5">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-slate-700 rounded-xl p-5 border border-slate-600 hover:border-cyan-400 transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {job.title}
                                </h3>

                                <p className="text-gray-400 mt-1">
                                    {job.company}
                                </p>

                                <p className="text-sm text-gray-400 mt-2">
                                    {job.description}
                                </p>

                            </div>

                            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-bold">
                                {job.matchScore}% Match
                            </span>

                        </div>

                        {/* Type & Level */}
                        <div className="flex gap-3 mt-4">
                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.type}
                            </span>

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.level}
                            </span>

                            <span className="bg-slate-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                                {job.experience}+ Years
                            </span>
                        </div>

                        {/* Matching Skills */}
                        <div className="mt-5">
                            <h4 className="text-green-400 font-medium mb-2">
                                Matching Skills
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                {job.matchingSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Missing Skills */}
                        <div className="mt-5">
                            <h4 className="text-red-400 font-medium mb-2">
                                Missing Skills
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                {job.missingSkills.length > 0 ? (
                                    job.missingSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-green-400 font-medium">
                                        No missing skills
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => setSelectedJob(job)}
                            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition py-2 rounded-lg font-semibold text-white"
                        >
                            View Details →
                        </button>
                    </div>
                ))}
            </div>

            <JobDetailsModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

        </div>
    );
};

export default JobRecommendations;