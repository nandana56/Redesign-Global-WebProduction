import React, { useEffect } from "react";
import SolutionsHero from "../components/SolutionsHero";
import SolutionsRadar from "../components/SolutionsRadar";
import SolutionsCustomAgents from "../components/SolutionsCustomAgents";
import SolutionsCaseStudies from "../components/SolutionsCaseStudies";

export default function Solutions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#000e34] min-h-screen text-white overflow-x-hidden">
      <SolutionsHero />
      <SolutionsRadar />
      <SolutionsCustomAgents />
      <SolutionsCaseStudies />
    </div>
  );
}
