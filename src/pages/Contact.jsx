import React from "react";
import ContactLightningScene from "../components/ContactLightningScene";

const Contact = () => {
    return (
        <div className="bg-[#020617] min-h-screen">
            {/* 3D Hero Section - Solid matching background */}
            <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#020617]">
                {/* Background Glow Effect (Optional but adds depth) */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />
                </div>
                
                <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text */}
                    <div className="text-left py-12 lg:py-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                            Let&apos;s Build the Future Together — <br className="hidden md:block" /> Contact Us Today
                        </h1>
                        <p className="text-base sm:text-md md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed font-poppins font-light">
                            At Global Web Production, we deliver cutting-edge digital solutions and unparalleled customer support. Whether you are a potential client, a valued partner, or have a question, we&apos;d love to hear from you.
                        </p>
                    </div>

                {/* Right Side: 3D */}
                <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center">
                    <ContactLightningScene />
                </div>
            </div>
        </div>

            <div className="bg-[#06265d] px-6 md:px-12 py-20">
                <div className="flex flex-col items-center max-w-7xl mx-auto">

                    {/* FORM */}
                    <div className="p-8 rounded-2xl bg-white shadow-2xl border border-gray-100 max-w-2xl mx-auto w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">
                            Send us a message
                        </h2>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    placeholder="First Name"
                                    className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    type="text"
                                    name="firstName"
                                    required
                                />
                                <input
                                    placeholder="Last Name"
                                    className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    type="text"
                                    name="lastName"
                                    required
                                />
                            </div>

                            <input
                                placeholder="Company"
                                className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                type="text"
                                name="company"
                            />

                            <input
                                placeholder="Email"
                                className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                type="email"
                                name="email"
                                required
                            />

                            <select
                                name="businessArea"
                                className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                <option value="" className="text-gray-500">Select Business Area</option>
                                <option value="Enterprise" className="text-gray-800">Enterprise</option>
                                <option value="SMB" className="text-gray-800">SMB</option>
                            </select>

                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="4"
                                className="bg-white border border-gray-200 rounded-lg p-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                                style={{
                                    background: "linear-gradient(90deg, #57c2ff 0%, #3b82f6 100%)",
                                }}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;