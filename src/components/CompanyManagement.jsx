import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const executives = [
    {
        id: "byron",
        name: "Byron Prather",
        title: "CEO & Founder",
        image: "/About/ByronPrather900.webp",
        bio: (
            <>
                Byron Prather has more than 20 years of experience as a Microsoft senior manager, programming digital experiences and supervising teams responsible for web development, search engine optimization and experimentation. <br /><br />
                At Microsoft, he played a pivotal role shaping the company’s digital offerings, driving innovation and creating user experiences that resonated with millions of site visitors worldwide. His pursuit of excellence and dedication to strategic thinking have been instrumental in the success of Microsoft’s digital ventures. <br /><br />
                Byron strives to empower businesses of all sizes with the same success for which he was responsible during his years at Microsoft.
            </>
        )
    },
    {
        id: "rajalekshmi",
        name: "Rajalekshmi Santha",
        title: "Chief Technology Officer",
        image: "/About/Lekshmi_900.webp",
        bio: (
            <>
                Rajalekshmi Santha is a distinguished IT leader with a career spanning over 17 years. Her extensive experience and leadership qualities make her an invaluable addition to the Global Web Production team. Known for her ability to drive innovation and foster a culture of critical thinking, Rajalekshmi’s leadership is grounded in thoughtfulness and a deep understanding of complex business processes. <br /><br />
                Rajalekshmi excels in designing and delivering customized products for clients, showcasing her prowess in stakeholder coordination and Salesforce management. Her dedication to continuous improvement and her passion for innovation are evident in her work. She is a problem solver at heart, and her ability to collaborate with various stakeholders to co-create innovative solutions sets her apart.
            </>
        )
    },
    {
        id: "marty",
        name: "Marty Kneeland",
        title: "Sr. Director of Enterprise Business Development",
        image: "/About/Marty_Kneeland.jpg",
        bio: (
            <>
                Marty Kneeland is a relationship-driven business development leader with more than twenty years of experience delivering enterprise web and marketing programs for Microsoft and other global brands. He began his career as a technical program manager supporting large-scale product and web launches, then expanded into consulting, where he led global site operations, localization, and data-driven marketing initiatives across dozens of international markets.<br /><br />
                At Global Web Production, Marty helps enterprise teams move faster and execute with precision. He builds trusted partnerships, connects business objectives to technical delivery, and focuses on measurable outcomes. His background spans go-to-market strategy, marketing automation, and content operations at global scale.<br /><br />
                Marty brings an entrepreneurial mindset to every engagement. He listens first, solves with clarity, and works across stakeholders to turn complex needs into programs that ship on time and perform.
            </>
        )
    }
];

const RotatingSvgOverlays = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 721 721" fill="none" preserveAspectRatio="xMidYMid meet" className="w-[105%] h-[105%] animate-[spin_25s_linear_infinite]">
            <path d="M106.366 336C112.119 275.288 139.549 216.427 188.095 172.028C278.605 89.2495 412.651 84.0546 508.5 152.797" stroke="#57C2FF" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="534.649" strokeDashoffset="534.649">
                <animate attributeName="stroke-dashoffset" from="534.649" to="0" dur="3s" fill="freeze" />
            </path>
            <path d="M524.501 165.27C532.78 172.272 540.707 179.882 548.219 188.096C643.228 291.978 636.034 453.21 532.152 548.219C442.973 629.78 311.53 636.023 216.001 570.436" stroke="#57C2FF" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="775.412" strokeDashoffset="775.412">
                <animate attributeName="stroke-dashoffset" from="775.412" to="0" dur="3s" fill="freeze" />
            </path>
            <path d="M205 562.44C193.34 553.478 182.297 543.38 172.028 532.151C127.131 483.061 105.057 421.164 105.224 359.5" stroke="#57C2FF" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="234.314" strokeDashoffset="234.314">
                <animate attributeName="stroke-dashoffset" from="234.314" to="0" dur="3s" fill="freeze" />
            </path>
            
            <circle r="11.4705" fill="#57C2FF" stroke="#57C2FF" strokeWidth="3.82348">
                <animateMotion path="M106.366 336C112.119 275.288 139.549 216.427 188.095 172.028C278.605 89.2495 412.651 84.0546 508.5 152.797" dur="3s" rotate="auto" fill="freeze" />
            </circle>
            <circle r="8.28422" fill="#57C2FF" stroke="#57C2FF" strokeWidth="3.82348">
                <animateMotion path="M524.501 165.27C532.78 172.272 540.707 179.882 548.219 188.096C643.228 291.978 636.034 453.21 532.152 548.219C442.973 629.78 311.53 636.023 216.001 570.436" dur="3s" rotate="auto" fill="freeze" />
            </circle>
            <circle r="14.6567" fill="#57C2FF" stroke="#57C2FF" strokeWidth="3.82348">
                <animateMotion path="M205 562.44C193.34 553.478 182.297 543.38 172.028 532.151C127.131 483.061 105.057 421.164 105.224 359.5" dur="3s" rotate="auto" fill="freeze" />
            </circle>
        </svg>
    </motion.div>
);

const CompanyManagement = () => {
    const [activeId, setActiveId] = useState(executives[0].id);

    return (
        <section className="bg-gradient-to-b from-[#003C70] to-[#000026] overflow-hidden relative font-poppins pt-20 pb-40 px-4 sm:px-6 lg:px-12 flex flex-col items-center min-h-[90vh]">
            
            <div className="w-full text-white relative z-20 mb-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-center uppercase">
                    COMPANY MANAGEMENT
                </h2>
                <div className="w-24 h-1 bg-[#57C2FF] mt-4 rounded-full"></div>
                <span className="text-[#57C2FF] text-sm md:text-base uppercase tracking-widest animate-pulse mt-4 font-bold text-center">
                    Hover or tap a profile to expand
                </span>
            </div>

            {/* Accordion Container */}
            <div className="w-full max-w-[1400px] flex flex-col lg:flex-row h-auto lg:h-[650px] gap-4 relative z-10 transition-all duration-500 mx-auto">
                {executives.map((exec) => {
                    const isActive = activeId === exec.id;

                    return (
                        <motion.div
                            key={exec.id}
                            layout
                            onMouseEnter={() => setActiveId(exec.id)}
                            onClick={() => setActiveId(exec.id)}
                            initial={false}
                            animate={{
                                flex: isActive ? 6 : 1
                            }}
                            className={`relative rounded-[30px] overflow-hidden cursor-pointer flex flex-col lg:flex-row items-center justify-center border border-[#57C2FF]/20 shadow-2xl bg-[#000026]/40 backdrop-blur-xl group
                            `}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                        >
                            
                            {/* Inner Content Wrapper */}
                            <div className={`w-full h-full flex items-center justify-center p-6 ${isActive ? 'flex-col lg:flex-row gap-6 lg:gap-12' : 'flex-col gap-4'} transition-all duration-500`}>
                                
                                {/* Image / Avatar Area */}
                                <motion.div 
                                    layout
                                    className={`relative flex justify-center items-center shrink-0 ${isActive ? 'w-full lg:w-[45%] max-w-[350px] aspect-square' : 'w-24 lg:w-32 aspect-square lg:mt-6 self-start lg:self-center'}`}
                                >
                                    {isActive && <RotatingSvgOverlays />}
                                    
                                    <motion.div 
                                        layout
                                        className={`relative aspect-square rounded-full overflow-hidden shadow-[0_0_30px_rgba(87,194,255,0.15)] z-10 ${isActive ? 'w-[52%]' : 'w-full'}`}
                                    >
                                        <img 
                                            src={exec.image} 
                                            alt={exec.name} 
                                            className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-[#003C70]/20 mix-blend-overlay"></div>
                                    </motion.div>
                                </motion.div>

                                {/* Closed State Content (Vertical/Horizontal Text) */}
                                {!isActive && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-start lg:justify-center text-center lg:-rotate-90 lg:whitespace-nowrap flex-grow pb-6 lg:pb-0 h-full w-full"
                                    >
                                        <h2 className="text-white text-lg lg:text-2xl font-bold tracking-wider">{exec.name}</h2>
                                        <p className="text-[#57C2FF] text-[10px] lg:text-xs uppercase tracking-widest mt-2">{exec.title.split(' ')[0]}</p>
                                    </motion.div>
                                )}

                                {/* Open State Bio & Details */}
                                <AnimatePresence mode="popLayout">
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="flex flex-col justify-center w-full lg:w-[55%] text-left h-full"
                                        >
                                            <div className="lg:pr-8">
                                                <h3 className="text-[#57C2FF] text-sm md:text-base font-medium tracking-widest uppercase mb-2">
                                                    {exec.title}
                                                </h3>
                                                <h2 className="text-white text-3xl lg:text-5xl font-bold pb-6 tracking-tight">
                                                    {exec.name}
                                                </h2>
                                                {/* Text Content */}
                                                <div className="text-gray-200 text-sm md:text-base leading-relaxed font-light space-y-4 max-h-[300px] lg:max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                                    {exec.bio}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </section>
    );
};

export default CompanyManagement;
