import { useState } from "react";
import { analyzeResume } from "../../utils/resumeAnalyzer";
import { extractTextFromPDF } from "../../utils/resumeParser";

const UploadResume = ({ setAnalysis }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            alert("Please upload a PDF resume.");
            return;
        }

        setFile(selectedFile);
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert("Please select a resume first.");
            return;
        }

        try {
            setLoading(true);

            const text = await extractTextFromPDF(file);

            if (!text || text.trim().length === 0) {
                throw new Error(
                    "Could not extract text from this PDF. Please upload a text-based PDF."
                );
            }

            const result = analyzeResume(text);

            console.log("Resume Analysis Result:", result);

            setAnalysis(result);
        } catch (error) {
            console.error("PDF Error:", error);
            alert(error.message || "Something went wrong while analyzing the resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-slate-900 py-20 px-8">
            <div className="max-w-4xl mx-auto">

                <h2 className="text-4xl font-bold text-center text-white mb-4">
                    Upload Your Resume
                </h2>

                <p className="text-center text-gray-400 mb-10">
                    Upload your resume and get ATS analysis instantly.
                </p>

                <div className="flex flex-col items-center gap-6">

                    <div className="text-5xl mb-4">
                        📄
                    </div>

                    <label className="bg-blue-600 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-blue-700 transition">
                        Choose Resume

                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {file && (
                        <div className="text-center">
                            <p className="text-green-400 mt-4">
                                ✓ Selected: {file.name}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                PDF • Ready for analysis
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || loading}
                        className={`px-6 py-3 rounded-lg text-white transition ${
                            !file || loading
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Analyzing Resume..." : "Analyze Resume"}
                    </button>

                </div>
            </div>
        </section>
    );
};

export default UploadResume;