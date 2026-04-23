import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Layers, Zap, TrendingUp, Cpu, BarChart3, Globe2 } from "lucide-react";

export default function AEMCloudMigration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const briefPoints = [
    "300 pages migrated from legacy CMS to Adobe Experience Manager in 4 months",
    "4,000+ digital assets migrated, renamed, and documented with custom automation tools",
    "591 person-hours saved through proprietary automation—equivalent to 15 full working weeks",
    "99.97% quality score maintained throughout, exceeding SLA by 1.47 percentage points",
  ];

  const results = [
    { title: "300 pages migrated to AEM Cloud", impact: "In 4 months vs. 7–8 conventionally", icon: <Layers className="w-6 h-6" /> },
    { title: "4,000+ assets migrated and documented", impact: "Fully automated extraction and renaming", icon: <Cpu className="w-6 h-6" /> },
    { title: "50 new pages created in AEM", impact: "Live across all markets", icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: "20 custom AEM components built", impact: "Reusable across all markets", icon: <Zap className="w-6 h-6" /> },
    { title: "7 Azure pages + 4 Azure components", impact: "Extended platform reach", icon: <Globe2 className="w-6 h-6" /> },
    { title: "20+ locales managed", impact: "Consistent, market-ready delivery", icon: <Globe2 className="w-6 h-6" /> },
    { title: "591 person-hours saved", impact: "Through proprietary automation tooling", icon: <Clock className="w-6 h-6" /> },
    { title: "99.97% quality score", impact: "100% SLA met across all milestones", icon: <BarChart3 className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans selection:bg-[#000e34] selection:text-white overflow-x-hidden">
      
      {/* ── CINEMATIC HERO ── */}
      <section className="relative w-full h-[85vh] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="/solution/11.webp" 
            alt="AEM Migration" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000e34] via-[#000e34]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-6 py-2 rounded-full border border-white/20 uppercase tracking-[0.2em] mb-8">
              Customer Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl font-poppins">
              From Legacy to Leading Edge: How We Moved a Fortune 50 Tech Giant to AEM Cloud Without Missing a Beat
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW FLOATING BAR ── */}
      <div className="relative z-20 -mt-12 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Overview / Scope</p>
            <p className="text-lg font-medium text-slate-800 leading-tight">Legacy CMS to Adobe Experience Manager migration for Fortune 50 technology company</p>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-slate-200" />
          <div className="flex-1 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Timeline</p>
            <p className="text-lg font-medium text-slate-800">4 Months <span className="text-slate-400 text-sm font-normal">(vs 7-8 traditional)</span></p>
          </div>
          <Link to="/contact" className="bg-[#000e34] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
            Get in touch
          </Link>
        </div>
      </div>

      {/* ── IN BRIEF HUD ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Layers size={300} />
          </div>
          <h3 className="text-2xl font-bold mb-12 text-[#000e34] font-poppins">In brief</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {briefPoints.map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORYTELLING SECTIONS: SPLIT LAYOUT ── */}
      <div className="space-y-40 py-20">
        
        {/* Section 1 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="lg:sticky lg:top-32 h-fit">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000e34] leading-tight font-poppins">
              The moment a platform becomes a springboard
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 mt-8 rounded-full" />
          </div>
          <div className="space-y-8 text-[19px] leading-[1.8] text-slate-700 font-serif">
            <p>For a Fortune 50 technology company serving millions of visitors across 20+ global markets, the decision to move to Adobe Experience Manager (AEM) Cloud was a strategic one — driven not by necessity alone, but by ambition. The business wanted more than a content management upgrade. It wanted a unified foundation for personalization, audience targeting, and campaign activation that could scale across every market it served.</p>
            <p>Their web team had been operating on a legacy CMS that had served its purpose for years — but was increasingly showing its age. Content updates were slow, cross-functional collaboration was difficult, and the technical overhead of maintaining the platform was pulling resources away from more strategic work.</p>
            <p>The challenge was executing a migration of this scale without disrupting a single live market, in a timeline that matched the pace of the business. That's where Global Web Production came in.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 flex-row-reverse">
          <div className="lg:sticky lg:top-32 h-fit lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000e34] leading-tight font-poppins">
              A migration built for speed — and built to last
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 mt-8 rounded-full" />
          </div>
          <div className="space-y-8 text-[19px] leading-[1.8] text-slate-700 font-serif lg:order-1">
            <p>We took ownership of the end-to-end migration: 300 pages, 4,000+ assets, and 20+ locales — delivered in just 4 months. A conventional approach would have taken 7–8. The difference was a suite of proprietary automation tools we built specifically for this engagement — covering QA, asset extraction, content documentation, and live progress reporting — saving 591 person-hours across the program.</p>
            <p>But speed was never the only goal. Quality scores didn't just hold under pressure — they improved as delivery accelerated. The engagement closed at a 99.97% quality score, with 100% SLA adherence across every milestone.</p>
          </div>
        </section>

        {/* Section 3: Progress Chart */}
        <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#000e34] font-poppins">Migration progress over time</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-serif">The chart reflects a consistent, accelerating pace of delivery with no backlog buildup at any stage.</p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
            <img src="/solution/9.png" alt="Progress" className="w-full h-auto group-hover:scale-105 transition-transform duration-1000" />
          </div>
          <p className="text-slate-600 text-lg leading-relaxed font-serif text-justify">The steepest gains occur in months 2 and 3, as the production team and automation toolset reached full operational momentum. The asset migration curve consistently outpaces the page migration curve — demonstrating how the automated extraction and renaming pipeline absorbed high-volume work without a proportional increase in manual effort.</p>
        </section>

        {/* Section 4: Automation */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="lg:sticky lg:top-32 h-fit">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000e34] leading-tight font-poppins">
              The power of automation
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 mt-8 rounded-full" />
          </div>
          <div className="space-y-8">
            <p className="text-[19px] leading-[1.8] text-slate-700 font-serif">Completing a migration of this scope in 4 months would not have been possible through manual effort alone. Our team built and deployed five proprietary automation tools during the engagement:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "Custom QA tool", desc: "Standardized testing across the migration and caught issues upstream." },
                { name: "Site data extractor", desc: "Built around CSR renaming logic, it accelerated content inventory." },
                { name: "Asset migration tool", desc: "Handled renaming, extraction, and documentation in one workflow." },
                { name: "Content-to-copy doc tool", desc: "Converted CMS content into stakeholder-ready documentation." },
                { name: "Reporting agent", desc: "Provided live visibility into progress, quality scores, and output." },
              ].map((tool, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-blue-600 mb-2">{tool.name}</h4>
                  <p className="text-sm text-slate-600">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Time Saved */}
        <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#000e34] font-poppins">Time saved through automation</h3>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
              <img src="/solution/10.png" alt="Time Saved" className="w-full h-auto group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
          <div className="space-y-8 text-lg text-slate-700 font-serif text-justify">
            <p>Across all five tools, the team saved an estimated 591 person-hours — the equivalent of roughly 15 full working weeks of manual effort. This is the single biggest reason a 4-month delivery was achievable.</p>
            <p><strong>Forward projection:</strong> As the client scales to additional product lines and markets over the next 12 months, these tools are projected to save an additional 800–1,000 hours annually — compounding their return on investment well beyond the initial engagement.</p>
            <p className="italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50">"We didn't just want to complete the migration — we wanted to build a better process along the way. Every tool we created was solving a real problem the team was facing in real time."</p>
          </div>
        </section>

        {/* Section 6: Unlocks */}
        <section className="bg-[#000e34] text-white py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/Assets/Section-Background-B.webp')] opacity-20 bg-cover bg-center" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight font-poppins">What AEM Cloud unlocks: beyond publishing</h2>
              <div className="w-20 h-1.5 bg-blue-500 mt-8 rounded-full" />
              <p className="mt-8 text-lg text-blue-100 font-serif leading-relaxed">
                The shift to AEM Cloud was never just about moving content. It opened the door to capabilities that fundamentally change how the client's teams operate.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { title: "Adobe Target integration", desc: "Enabling A/B testing, multivariate experiments, and audience-specific experiences." },
                { title: "Personalization at scale", desc: "Content now adapts to visitor segments, campaign sources, and locale in real time." },
                { title: "Analytics-connected publishing", desc: "Every page and component is instrumented for performance measurement." },
                { title: "Author empowerment", desc: "20 custom-built components mean regional teams can publish independently." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="bg-blue-500/20 rounded-xl p-3">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
              <p className="pt-6 font-medium text-blue-400">What previously required weeks of engineering effort can now be actioned by content authors in hours.</p>
            </div>
          </div>
        </section>

        {/* Section 7: BENTO RESULTS GRID */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-3xl font-bold text-[#000e34] font-poppins tracking-tight">The Results</h3>
            <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all"
              >
                <div className="text-blue-500 mb-6">{res.icon}</div>
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm leading-tight uppercase tracking-wider">{res.title}</h4>
                  <p className="text-blue-600 font-bold text-lg">{res.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 8: Leaves Behind */}
        <section className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#000e34] font-poppins">What it leaves behind</h3>
          <div className="space-y-8 text-xl text-slate-700 leading-relaxed font-serif italic">
            <p>"The most important outcome isn't the migration itself — it's the platform the client now operates on. AEM Cloud gives their teams the freedom to publish faster, personalise smarter, and deliver consistent experiences."</p>
          </div>
          <p className="text-slate-500 text-lg font-serif">And as the client scales to new product lines and markets, the automation tools built during this engagement are projected to save an additional 800–1,000 hours annually — compounding their return well beyond the initial programme.</p>
        </section>

        {/* Section 9: Takeaways */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-slate-100">
           <div className="bg-[#f8f9fb] rounded-[3rem] p-12 lg:p-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#000e34] mb-12 font-poppins">Key Takeaways</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="space-y-8">
                    <div>
                       <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">Technologies</h5>
                       <p className="text-slate-700 leading-relaxed font-serif">Adobe Experience Manager Cloud, AEM Assets, AEM Sites, Adobe Target, Adobe Analytics, Microsoft Azure, WordPress, Paid Media Platforms</p>
                    </div>
                    <div>
                       <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">Services</h5>
                       <p className="text-slate-700 leading-relaxed font-serif">End-to-end CMS migration, asset migration, custom component development, Azure page development, multi-locale content management, paid media implementation, analytics integration, WordPress web production, QA automation, proprietary production tooling</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {[
                       "300 pages migrated to AEM Cloud in 4 months",
                       "4,000+ assets migrated, renamed, and documented",
                       "~50 new AEM pages created",
                       "20 unique custom components built",
                       "7 Azure pages and 4 Azure components delivered",
                       "20+ locales managed",
                       "100% SLA met across all milestones",
                       "99.97% quality score achieved",
                       "591 person-hours saved through automation",
                       "800–1,000 additional hours projected saved annually"
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4 items-center group">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                          <p className="text-slate-700 text-sm font-medium">{item}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
           <div className="bg-[#000e34] rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('/Assets/Section-Background-B.webp')] opacity-10 bg-cover bg-center" />
              <div className="relative z-10 space-y-10">
                 <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight font-poppins max-w-3xl mx-auto">
                    Ready to modernise your web platform and unlock the full power of AEM Cloud?
                 </h2>
                 <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-serif opacity-80">
                    Global Web Production brings the technical depth, production discipline, and creative problem-solving to get you there — on time, at quality, and built to scale.
                 </p>
                 <div className="pt-6">
                    <Link to="/contact" className="inline-block bg-[#57C2FF] text-black px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(87,194,255,0.3)]">
                       Get in touch
                    </Link>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
