import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import UploadResume from "../components/resume/UploadResume";
import Dashboard from "./Dashboard";
import Features from "../components/home/Features";
import Footer from "../components/layout/Footer";

const Home = () => {

  const [analysis, setAnalysis] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <UploadResume setAnalysis={setAnalysis} />

      {analysis && (
        <Dashboard analysis={analysis} />
      )}
      
      <Features />
      <Footer />
    </>
  );
};

export default Home;