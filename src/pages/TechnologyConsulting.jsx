import React, { useEffect } from "react";
import TechnologyConsultingHero from "../components/TechnologyConsultingHero";
import TechnologyConsultingCapabilities from "../components/TechnologyConsultingCapabilities";

const TechnologyConsulting = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <main className="w-full min-h-screen bg-neutral-50 font-poppins">
            <TechnologyConsultingHero />
            <TechnologyConsultingCapabilities />
        </main>
    );
};

export default TechnologyConsulting;
