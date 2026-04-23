import React from 'react';

const reasons = [
    {
        title: "Global Delivery Excellence",
        desc: "With a proven track record across industries and geographies, we bring consistency, reliability, and agility to every project."
    },
    {
        title: "Certified Experts",
        desc: "Our team includes platform-certified developers, architects, and strategists with hands-on experience in enterprise deployments."
    },
    {
        title: "Security & Compliance",
        desc: "We adhere to strict data governance, privacy, and security standards to ensure enterprise-grade protection and peace of mind."
    },
    {
        title: "End-to-End Ownership",
        desc: "From planning and design to implementation and support—we own the entire lifecycle of your platform success."
    }
];

const EnterpriseWhyUs = () => {
    return (
        <section className="bg-neutral-950 py-24 px-6 md:px-12 font-poppins selection:bg-red-500/30">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-white font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-24">
                    Why Work With Us?
                </h1>
                
                {/* 4-Column Wireframe Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800 border-y border-neutral-800">
                    {reasons.map((reason, index) => (
                        <div 
                            key={index} 
                            className="group p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-300 cursor-pointer flex flex-col"
                        >
                            {/* Flat Interactive Accent */}
                            <div className="w-12 h-1 bg-neutral-800 mb-8 group-hover:bg-red-600 transition-colors duration-300 shrink-0"></div>
                            
                            <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">
                                {reason.title}
                            </h4>
                            
                            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-medium">
                                {reason.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EnterpriseWhyUs;
