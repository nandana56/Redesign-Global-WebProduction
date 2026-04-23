import React, { useEffect } from "react";
import EnterpriseHeroFlat from "../components/EnterpriseHeroFlat";
import EnterpriseOfferings from "../components/EnterpriseOfferings";
import EnterpriseWhyUs from "../components/EnterpriseWhyUs";
import EnterpriseCTA from "../components/EnterpriseCTA";

const Enterprise = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#06153d] font-poppins selection:bg-blue-500/30">
            {/* Hero Section */}
            <EnterpriseHeroFlat />

            {/* Core Offerings - Editorial Section */}
            <EnterpriseOfferings />

            {/* Why Work With Us Section */}
            <EnterpriseWhyUs />

            {/* Call to Action Section */}
            <EnterpriseCTA />
        </main>
    );
};

export default Enterprise;