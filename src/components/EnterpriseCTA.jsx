import React from 'react';

const EnterpriseCTA = () => {
    return (
        <section className="bg-neutral-950 py-16 px-6 md:px-12 font-poppins selection:bg-blue-500/30 pb-32">
            <div className="max-w-7xl mx-auto">
                {/* completely different layout: left/right split inside a premium framed container instead of basic centered text */}
                <div className="border border-neutral-800 rounded-[2.5rem] p-10 sm:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-10 bg-neutral-900 hover:bg-neutral-800/80 transition-colors duration-500">
                    
                    <div className="md:w-2/3 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Let’s Shape Your Digital Future
                        </h2>
                    </div>

                    <div className="md:w-1/3 flex justify-center md:justify-end shrink-0">
                        <a href="/contact" data-discover="true">
                            <button className="bg-blue-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg whitespace-nowrap">
                                Schedule a consultation
                            </button>
                        </a>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default EnterpriseCTA;
