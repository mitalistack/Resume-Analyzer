import { useState } from "react";
import { analyzeResume } from "../../utils/resumeAnalyzer";
import { extractTextFromPDF } from "../../utils/resumeParser";

const UploadResume = ({ setAnalysis }) => {

    const [file, setFile] = useState(null);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert("Please select a resume first.");
            return;
        }

        try {
            const text = await extractTextFromPDF(file);

            const result = analyzeResume(text);

            console.log(result);

            setAnalysis(result);

            setShowAnalysis(true);

        } catch (error) {
            console.error("PDF Error:", error);

            alert(error.message);

            console.log(error);
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

                    <div className="text-5xl mb-4">📄</div>

                    <label className="bg-blue-600 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-blue-700">
                        Choose Resume
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {file && (
                        <p className="text-green-400 mt-4">
                            Selected: {file.name}
                        </p>
                    )}

                    {showAnalysis && (
                        <div className="mt-8 bg-slate-800 p-6 rounded-xl text-left">
                            <h3 className="text-white text-xl font-bold mb-4">
                                Resume Analysis
                            </h3>

                            <p className="text-green-400 mb-2">
                                ATS Score: Coming Soon...
                            </p>

                            <p className="text-white">Skills Found:</p>

                            <ul className="text-gray-300 mt-2">
                                <li>✔ React.js</li>
                                <li>✔ JavaScript</li>
                                <li>✔ HTML</li>
                                <li>✔ CSS</li>
                            </ul>

                            <p className="text-yellow-400 mt-4">
                                Suggestions:
                            </p>

                            <ul className="text-gray-300">
                                <li>• Add more project keywords</li>
                                <li>• Improve resume summary</li>
                                <li>• Include certifications</li>
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        className=" bg-blue-600 px-6 py-3 rounded-lg text-white hover:bg-blue-700"
                    >
                        Analyze Resume
                    </button>


                </div>
            </div>
        </section>
    );
};

export default UploadResume;