import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    CheckCircle2,
    TrendingUp,
    Clock,
    Bot,
    Users,
    ArrowLeft,
    Share2,
    Calendar,
    Search,
    ShieldCheck,
    Layout
} from "lucide-react";

const RealEstateCaseStudy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        {
            label: "Increase in Qualified Leads",
            value: "42%",
            icon: <TrendingUp className="w-6 h-6 text-[#57c2ff]" />,
            description: "Over a 6-month period using the AI Lead Scoring Engine."
        },
        {
            label: "Reduction in Response Time",
            value: "60%",
            icon: <Clock className="w-6 h-6 text-[#57c2ff]" />,
            description: "Instant interaction handling visitors 24/7."
        },
        {
            label: "Autonomous Inquiries",
            value: "80%",
            icon: <Bot className="w-6 h-6 text-[#57c2ff]" />,
            description: "Handled without human agent intervention."
        }
    ];

    const requirements = [
        "Engage website visitors in real-time 24/7",
        "Answer listing-based questions instantly",
        "Qualify leads by collecting intent and budget data",
        "Route high-intent users to human agents",
        "Secure data in the backend",
        "Provide market trend insights using dynamic data"
    ];

    const features = [
        {
            title: "Smart Listing Navigator",
            description: "Let users filter listings through conversation using natural language (e.g., 'Show me 3BHK homes under $800K in Austin').",
            icon: <Search className="w-8 h-8" />
        },
        {
            title: "Lead Scoring Engine",
            description: "Used NLP to analyze urgency, location preference, and budget for automated lead prioritization.",
            icon: <TrendingUp className="w-8 h-8" />
        },
        {
            title: "Multi-platform Deployment",
            description: "Enabled the chatbot on website, Facebook Messenger, and WhatsApp for cross-platform continuity.",
            icon: <Layout className="w-8 h-8" />
        },
        {
            title: "Real-time Market Insights",
            description: "Displayed recent price trends, property availability, and zip-code popularity dynamically.",
            icon: <TrendingUp className="w-8 h-8" />
        },
        {
            title: "Agent Booking System",
            description: "Synced with agent calendars to allow direct appointment scheduling for hot leads.",
            icon: <Calendar className="w-8 h-8" />
        }
    ];

    return (
        <div className="bg-white min-h-screen font-poppins selection:bg-[#57c2ff]/20">
            {/* --- HERO SECTION --- */}
            <section className="relative pb-20 lg:pb-32 overflow-hidden bg-[#0b172a]">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#57c2ff_0%,transparent_50%)]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Link to="/blogs" className="flex items-center gap-2 text-[#57c2ff] font-medium mb-8 hover:gap-3 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {["Artificial Intelligence", "Real Estate", "Case Study"].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-[#57c2ff]/10 text-[#57c2ff] text-sm font-semibold border border-[#57c2ff]/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold text-white leading-tight mb-8">
                            Transforming Real Estate with an <span className="text-[#57c2ff]">AI Chatbot Agent</span>
                        </h1>

                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                            How a mid-sized real estate firm modernized client interactions and automated 80% of their inquiries using custom AI solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- CLIENT OVERVIEW & IMAGE --- */}
            <section className="py-12 sm:py-20 lg:py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-12px uppercase tracking-widest text-[#57c2ff] font-bold mb-4">Client Overview</h2>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Modernizing interactions for the digital-first buyer.
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            A mid-sized real estate firm wanted to modernize their client interaction model to meet the growing expectations of digital-first home buyers and sellers. With operations spanning multiple states and hundreds of listings live at any given time, the firm needed an intelligent interface that could streamline inquiries, qualify leads, and reduce time-to-conversion.
                        </p>
                        <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-semibold text-gray-400">Share this impact</span>
                            </div>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#57c2ff] hover:text-white transition-all">
                                    <span className="font-bold">f</span>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#57c2ff] hover:text-white transition-all">
                                    <span className="font-bold">in</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        <img
                            src="/Assets/Real-Estate.webp"
                            alt="Real Estate AI Dashboard"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* --- PROBLEM & SOLUTION GRID --- */}
            <section className="bg-gray-50 py-12 sm:py-20 lg:py-32 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
                        {/* Requirement */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">!</span>
                                The Requirement
                            </h2>
                            <div className="space-y-6">
                                {requirements.map((req, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-lg text-gray-700 font-medium">{req}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Solution Provided */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-2xl bg-blue-50 text-[#57c2ff] flex items-center justify-center">✓</span>
                                Solution Provided
                            </h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                We prototyped a <span className="text-gray-900 font-bold">custom AI real estate assistant</span>, fine-tuned for the U.S. market and integrated with the firm's MLS system, CRM (Salesforce), and website.
                            </p>
                            <div className="space-y-8">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex gap-6 group"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 rounded-3xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#57c2ff] group-hover:bg-[#57c2ff] group-hover:text-white transition-all duration-300">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- IMPACT STATS --- */}
            <section className="py-24 lg:py-40 bg-[#06235f] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#57c2ff] rounded-full blur-[200px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white text-2xl sm:text-3xl lg:text-5xl font-bold mb-16"
                    >
                        Estimated Impact in <span className="text-[#57c2ff]">6 Months</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 text-left hover:bg-white/10 transition-all duration-300 group"
                                >
                                <div className="mb-6 w-12 h-12 rounded-2xl bg-[#57c2ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl lg:text-6xl font-bold text-white mb-4">{stat.value}</div>
                                <div className="text-xl font-bold text-[#57c2ff] mb-4">{stat.label}</div>
                                <p className="text-gray-400 leading-relaxed">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-16 sm:py-24 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto rounded-[2.5rem] sm:rounded-[4rem] bg-gray-900 p-8 sm:p-12 lg:p-24 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
                            Ready to automate your <br /> <span className="text-[#57c2ff]">client success?</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                            Join the real estate leaders who are using Agentic AI to supercharge their conversion rates and streamline workflows.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact">
                                <button className="px-10 py-5 bg-[#57c2ff] text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-[#57c2ff]/30 transition-all">
                                    Book a Demo
                                </button>
                            </Link>
                            <Link to="/services">
                                <button className="px-10 py-5 border border-gray-700 text-white font-bold rounded-full text-lg hover:bg-gray-800 transition-all">
                                    Explore AI Services
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RealEstateCaseStudy;
