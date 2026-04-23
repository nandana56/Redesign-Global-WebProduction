import React, { useEffect } from "react";
import WebContentHero from "../components/WebContentHero";
import WebContentContent from "../components/WebContentContent";

const WebContentOptimization = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#06153d] font-poppins">
            <WebContentHero />
            <WebContentContent />
        </main>
    );
};

export default WebContentOptimization;
