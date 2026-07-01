import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadResume from "../components/UploadResume";
import Dashboard from "../components/Dashboard";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Home = () => {
  const [atsScore, setAtsScore] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <UploadResume setAtsScore={setAtsScore} />

      {atsScore && (
        <Dashboard atsScore={atsScore} />
      )}
      <Features />
      <Footer />
    </>
  );
};

export default Home;