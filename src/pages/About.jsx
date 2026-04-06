import React, { useEffect } from "react";
import AboutOverview from "../components/AboutOverview";
import CompanyManagement from "../components/CompanyManagement";
import AboutHeroKinetic from "../components/AboutHeroKinetic";
import IndustryArticles from "../components/IndustryArticles";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black relative">
            <div className="relative z-50">
                <AboutHeroKinetic />
            </div>
            <div className="relative z-40">
                <AboutOverview />
            </div>
            <div className="relative z-30">
                <CompanyManagement />
            </div>
            <div className="relative z-20">
                <IndustryArticles />
            </div>
        </div>
    );
};

export default About;