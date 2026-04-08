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


        </div>
    );
};

export default Contact;