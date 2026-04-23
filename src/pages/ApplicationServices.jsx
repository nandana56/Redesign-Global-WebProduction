import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ApplicationServicesHero from "../components/ApplicationServicesHero";
import ApplicationServicesCapabilities from "../components/ApplicationServicesCapabilities";

const whyWorkWithUs = [
    { title: "Engineering Excellence", desc: "Our global teams bring deep technical expertise and industry experience to every engagement." },
    { title: "Business-Centric Approach", desc: "We align technology with your strategic objectives, ensuring real business outcomes." },
    { title: "Secure by Design", desc: "From development to deployment, security is embedded in every layer of our solutions." },
    { title: "Continuous Innovation", desc: "We leverage the latest tools, frameworks, and platforms to future-proof your applications." }
];

const processSteps = [
    { title: "Discovery & Strategy", desc: "Understand business needs, user personas, and technical environments." },
    { title: "Design & Architecture", desc: "Blueprint scalable and modular solutions with UI/UX at the core." },
    { title: "Agile Development", desc: "Build iteratively with fast feedback loops and continuous delivery." },
    { title: "Deployment & Optimization", desc: "Launch on modern cloud infrastructure with full observability and support." }
];

const ApplicationServices = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#06153d] font-poppins selection:bg-blue-500/30">
            <ApplicationServicesHero />
            <ApplicationServicesCapabilities />

            {/* Why Work With Us Section */}
            <section className="bg-neutral-900 py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16 font-poppins">Why Work With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyWorkWithUs.map((item, i) => (
                            <div key={i} className="hover:bg-[#061539] bg-[#06265e] shadow-lg shadow-blue-500/10 p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-center border border-white/5">
                                <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                                <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="bg-white py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-16 font-poppins">Our Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, i) => (
                            <div key={i} className="bg-neutral-50 shadow-md p-8 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-6 text-xl shadow-lg shadow-blue-500/30">
                                    {i + 1}
                                </div>
                                <h4 className="text-xl font-bold text-black mb-4">{step.title}</h4>
                                <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Split Section (Mirroring Data & AI style) */}
            <section className="w-full font-poppins border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* LEFT PANEL: Branding/Identity */}
                    <div className="bg-[#06265e] px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center">
                        <div className="w-12 h-1 bg-blue-400 mb-8" />
                        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
                            Engineering the Future of Business
                        </h2>
                        <p className="mt-8 text-blue-100/60 leading-relaxed max-w-md">
                            We don't just build apps; we build engines for growth and digital resilience.
                        </p>
                    </div>

                    {/* RIGHT PANEL: CTA */}
                    <div className="bg-[#06153d] px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center items-start lg:pl-28 border-t-4 border-blue-600 lg:border-t-0 lg:border-l-4">
                        <div className="w-12 h-1 bg-blue-400 mb-10" />
                        <p className="text-2xl sm:text-4xl text-white font-bold leading-tight mb-10">
                            Let’s Shape Your Digital Future
                        </p>
                        <Link to="/contact">
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 font-bold shadow-xl hover:shadow-blue-500/20 active:scale-110">
                                Schedule a consultation
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ApplicationServices;
