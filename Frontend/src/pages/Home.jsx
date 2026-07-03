import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadResume from "../components/UploadResume";
import Dashboard from "../components/Dashboard";
import Features from "../components/Features";
import Footer from "../components/Footer";

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