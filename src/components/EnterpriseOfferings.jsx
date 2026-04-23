import React from 'react';

const offerings = [
    {
        num: "01",
        title: "AEM Development & Customisation",
        desc: "We offer full-scale Adobe Experience Manager (AEM) services, from architecture to implementation. Our certified AEM developers build and customize powerful digital experiences that are personalized, secure, and built to scale.",
        bullets: [
            "Custom component development",
            "Template and page authoring models",
            "Digital asset management (DAM) integration",
            "Multilingual site support and content targeting",
            "End-to-end migration from legacy systems"
        ],
        conclusion: "Our approach ensures consistent branding, faster authoring workflows, and seamless omnichannel delivery, all within the robust AEM ecosystem."
    },
    {
        num: "02",
        title: "WordPress Theme & Plugin Development",
        desc: "Our WordPress services go far beyond the basics. We create custom themes and plugins tailored to your brand and business logic—offering the flexibility of WordPress with enterprise-grade stability.",
        bullets: [
            "Bespoke UI/UX for themes",
            "Feature-rich, secure plugin development",
            "WooCommerce integration",
            "Multisite and multilingual setup",
            "Performance optimization and scalability solutions"
        ],
        conclusion: "Whether you're launching a marketing site, knowledge base, or eCommerce platform, we ensure your WordPress instance delivers value at scale."
    },
    {
        num: "03",
        title: "CMS Integration & Workflow Automation",
        desc: "Your content systems should work for you—not the other way around. We specialize in CMS integrations that connect your marketing tools, CRMs, analytics platforms, and more into a unified digital operations hub.",
        bullets: [
            "Integration with Salesforce, HubSpot, Marketo, and other Martech stacks",
            "Automated publishing workflows and role-based permissions",
            "Webhook-based triggers and API-led automation",
            "Scheduled content deployments and approval flows"
        ],
        conclusion: "Our solutions streamline content lifecycles, reduce operational overhead, and accelerate time-to-market for enterprise teams."
    },
    {
        num: "04",
        title: "Headless CMS Architecture",
        desc: "Unlock the future of content delivery with Headless CMS solutions that separate content from presentation—giving your teams the freedom to publish across channels, devices, and platforms from a single source of truth.",
        bullets: [
            "Architecture planning and implementation (Contentful, Strapi, Sanity, etc.)",
            "Frontend integration with React, Next.js, Vue, and other JS frameworks",
            "API-first content management",
            "Microservices architecture and cloud-native deployments",
            "Omnichannel publishing across web, mobile, IoT, and digital signage"
        ],
        conclusion: "Our headless approach enables rapid iteration, content reusability, and a scalable foundation for digital growth."
    }
];

const EnterpriseOfferings = () => {
    return (
        <section className="bg-white text-neutral-900 font-poppins selection:bg-red-500/30 border-t border-neutral-200">
            {/* Editorial Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                    <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-6 border-b border-red-600 pb-2">
                        Enterprise Platform Services
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-10">
                        We empower businesses to transform their digital presence through scalable, secure, and performance-driven enterprise platforms.
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed font-medium">
                        Our services are tailored to meet the evolving demands of modern businesses—bridging content, technology, and user experience across complex digital ecosystems. Whether you're looking to implement a robust CMS, streamline content workflows, or adopt a headless architecture, we bring deep technical expertise, strategic foresight, and industry best practices to every engagement.
                    </p>
                </div>

                {/* Full-width Hero Image for the section */}
                <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden rounded-[2rem] shadow-2xl relative mb-32">
                    <img 
                        src="/Assets/enterprise-sub.png" 
                        onError={(e) => { e.target.src = '/enterprise/hero_v2.png'; }}
                        alt="Enterprise Platforms Overview" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Industrial List Section */}
                <div className="border-t-2 border-neutral-900 pt-8 mb-20">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                            Our Core Offerings
                        </h2>
                        <span className="hidden md:block text-neutral-400 font-medium">04 Capabilities</span>
                    </div>

                    <div className="space-y-0">
                        {offerings.map((offering, idx) => (
                            <div 
                                key={idx} 
                                className="group flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-neutral-200 hover:bg-neutral-50 transition-colors px-4 lg:px-8 -mx-4 lg:-mx-8 rounded-3xl"
                            >
                                {/* Left Side: Large Number & Title */}
                                <div className="w-full lg:w-[40%] flex flex-col shrink-0">
                                    <span className="text-6xl md:text-8xl font-black text-neutral-200 group-hover:text-red-100 transition-colors mb-4 md:mb-8 leading-none">
                                        {offering.num}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                        {offering.title}
                                    </h3>
                                </div>

                                {/* Right Side: Descriptions & Bullets */}
                                <div className="w-full lg:w-[60%] flex flex-col justify-center">
                                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8">
                                        {offering.desc}
                                    </p>
                                    
                                    <div className="bg-white border border-neutral-100 shadow-sm p-6 sm:p-8 rounded-2xl mb-8 group-hover:border-red-100 transition-colors">
                                        <ul className="space-y-4">
                                            {offering.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start text-sm sm:text-base text-neutral-800 font-medium">
                                                    <span className="text-red-600 mr-4 font-bold">―</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="text-sm sm:text-base text-neutral-500 font-semibold uppercase tracking-wider pl-4 border-l-4 border-red-600">
                                        {offering.conclusion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnterpriseOfferings;
