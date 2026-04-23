import React from 'react';
import { Link } from 'react-router-dom';

const differentiators = [
    "Proven experience in enterprise AI and data transformation",
    "Cross-functional teams with deep AI, data, and engineering expertise",
    "Cloud-native and hybrid deployment capabilities",
    "End-to-end delivery: from strategy to production at scale"
];

const DataAndAIDifferentiator = () => {
    return (
        <section className="w-full font-poppins">
            <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT PANEL */}
                <div className="bg-[#06265e] px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center">
                    <div className="w-12 h-1 bg-blue-400 mb-8" />
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white mb-12">
                        What Makes Us Different
                    </h2>

                    <div className="border-t border-white/10">
                        {differentiators.map((item, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-6 py-6 border-b border-white/10 hover:bg-white/5 transition-colors duration-300 px-4 -mx-4 rounded-lg cursor-default"
                            >
                                <span className="text-2xl font-bold text-white/20 shrink-0 group-hover:text-blue-400 transition-colors duration-300 select-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="text-sm sm:text-lg text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300 pt-0.5">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="bg-[#06153d] px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center items-start lg:pl-28 border-t-4 border-blue-600 lg:border-t-0 lg:border-l-4">
                    <div className="w-12 h-1 bg-blue-400 mb-10" />
                    <p className="text-2xl sm:text-4xl text-white font-bold leading-tight mb-10">
                        Let's build what's next
                    </p>
                    <Link to="/contact">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg active:scale-110">
                            Schedule a Consultation
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default DataAndAIDifferentiator;
