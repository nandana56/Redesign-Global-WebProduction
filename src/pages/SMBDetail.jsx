import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const SMBDetail = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins selection:bg-[#57c2ff]/10">
      
      {/* --- HERO SECTION --- */}
     <section className="relative w-full bg-gradient-to-b from-white via-[#fcfdff] to-[#f0f7ff] text-center px-4 py-20 md:py-32 overflow-hidden border-b border-gray-100">
  {/* Soft Glow Accents to maintain visual interest without darkness */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#57c2ff] rounded-full blur-[150px] opacity-[0.03]" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#57C2FF] rounded-full blur-[130px] opacity-[0.05]" />
  </div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative z-10 max-w-7xl mx-auto"
  >
   
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter uppercase leading-[1.1]">
      Small to <span className="text-[#57c2ff]">Medium</span> <br /> 
      Business
    </h1>
    
    {/* Minimalist divider consistent with high-end tech layouts */}
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: "80px" }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="h-1.5 bg-[#57c2ff] mx-auto mt-10 rounded-full" 
    />
  </motion.div>
</section>

      {/* --- STRATEGIC PARTNER SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#57c2ff] leading-tight">
              We are your <br className="hidden md:block" /> strategic partner
            </h2>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-gray-600 text-[16px] leading-relaxed"
          >
            <p>
              Welcome to <span className="text-gray-900 font-semibold">Global Web Production</span> — your strategic partner in driving web technologies with a global impact. We offer web production, analytics, search engine optimization, and accessibility services. We are both a tactical vendor to help you complete short-term projects and a strategic partner to help you leverage your online presence for sustainable growth. 
            </p>
            <p className="mt-6">
              We believe in the power of data-driven decision-making, which is why we lead with a strong focus on measurement and reporting. Our goal is to empower your online presence, driving success and growth for your business. Discover how our expertise and dedication can help you achieve your digital objectives and unlock new possibilities in the ever-evolving digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SOLUTIONS BENTO GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card 1: Tailored Digital Solutions */}
          <motion.div variants={fadeInUp} className="group p-8 md:p-12 rounded-[40px] bg-gray-50 border border-gray-100 hover:border-[#57c2ff]/20 transition-all">
            <h3 className="text-2xl md:text-3xl font-bold text-[#57c2ff] mb-6 leading-tight">
              Empowering Small to Medium Businesses with Tailored Digital Solutions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At Global Web Production, we are passionate about empowering small to medium businesses with the tools and expertise needed to thrive in the digital world. Our Small to Medium Business Solutions are meticulously designed to cater to the unique requirements and aspirations of enterprises in this dynamic market segment. Whether you are looking to establish a strong online presence, drive organic traffic, gain valuable insights through analytics, or secure reliable hosting services, our comprehensive solutions have got you covered. As your strategic partner, we prioritize both strategy and execution, ensuring that every aspect of our services is finely tuned to help your business succeed.
            </p>
          </motion.div>

          {/* Card 2: SEO Strategies */}
          <motion.div variants={fadeInUp} className="group p-8 md:p-12 rounded-[40px] bg-[#57c2ff] text-white shadow-xl shadow-blue-900/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Driving Organic Growth with SEO Strategies
            </h3>
            <p className="opacity-90 leading-relaxed">
              In the fiercely competitive digital landscape, visibility is key. Our Small to Medium Business Solutions include results-driven SEO strategies aimed at improving your search engine rankings and attracting organic traffic to your website. Through meticulous keyword research, on-page and off-page optimization, and local SEO tactics, we help your business rise above the noise and reach your target audience effectively. With our data-driven approach, we continually analyze and optimize your SEO performance to ensure your business remains at the forefront of search engine results.
            </p>
          </motion.div>

          {/* Card 3: Analytics & Reports */}
          <motion.div variants={fadeInUp} className="group p-8 md:p-12 rounded-[40px] bg-white border border-gray-200 hover:shadow-xl transition-all">
            <h3 className="text-2xl md:text-3xl font-bold text-[#57c2ff] mb-6 leading-tight">
              Gaining Valuable Insights through Analytics and Reports
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Understanding your audience and their interactions with your website is crucial for making informed decisions. Our Small to Medium Business Solutions provide comprehensive analytics implementation and reporting services to help you gain valuable insights into your website’s performance. We track key performance indicators, user behavior, and conversion metrics to provide you with actionable data-driven insights. Armed with this information, you can refine your digital strategy, enhance user experiences, and maximize your return on investment.
            </p>
          </motion.div>

          {/* Card 4: Hosting Services */}
          <motion.div variants={fadeInUp} className="group p-8 md:p-12 rounded-[40px] bg-gray-900 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Secure and Reliable Hosting Services
            </h3>
            <p className="opacity-80 leading-relaxed">
              To ensure a seamless online experience for your customers, we offer secure and reliable hosting services as part of our Small to Medium Business Solutions. Our hosting solutions are tailored to meet the unique needs of small to medium businesses, providing a stable and high-performance platform for your website. With our hosting services, you can rest assured that your website is in safe hands, allowing you to focus on your core business while we handle the technical aspects of maintaining and optimizing your website’s hosting environment.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- FOOTER CTA SECTION --- */}
      <section className="w-full bg-gradient-to-r from-[#174370] to-[#123668] py-20 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mx-auto"
        >
          <h3 className="text-[34px] md:text-[44px] text-white font-bold leading-tight uppercase">
            Partner with <br className="md:hidden" /> Global Web Production
          </h3>
          <p className="text-[#ddf2ff] text-[18px] mt-6 opacity-90 leading-relaxed">
            Experience the transformative power of our Small to Medium Business Solutions. Let us be your trusted partner in driving online success, attracting more customers, and achieving your business objectives in the ever-evolving digital landscape. Contact us to discover how our tailored solutions can elevate your small to medium business to new heights.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
          >
            <button className="bg-[#57C2FF] hover:bg-white text-black font-bold py-4 px-12 rounded-full transition-all text-lg uppercase tracking-wide">
              Let's get started
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default SMBDetail;