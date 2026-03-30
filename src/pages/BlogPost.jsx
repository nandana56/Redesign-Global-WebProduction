import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogPost = () => {
    const { id } = useParams();

    return (
        <div className="pb-20 bg-gradient-to-br from-white via-blue-50/50 to-white min-h-[80vh]">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/blogs" className="text-[#57c2ff] font-bold mb-8 block">← Back to Blog</Link>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                >
                    <span className="text-[#57c2ff] font-bold uppercase tracking-widest">Industry Insights</span>
                    <h1 className="text-5xl font-bold text-gray-900 mt-4 leading-tight capitalize">
                        {id.replace("-", " ")}
                    </h1>
                    <div className="flex items-center gap-4 mt-6 text-gray-400">
                        <span>By Global Team</span>
                        <span>•</span>
                        <span>Feb 24, 2026</span>
                    </div>
                </motion.div>

                <div className="prose prose-lg max-w-none text-gray-600">
                    <p>
                        In the modern digital era, understanding the nuances of {id.replace("-", " ")} is critical for maintaining a competitive edge. This article explores the core concepts and emerging trends that are shaping the future of our industry.
                    </p>
                    <div className="my-12 h-64 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-300 italic font-bold">
                        [Featured Article Image]
                    </div>
                    <p>
                        Our analysis shows that organizations embracing these changes early often see a multi-fold increase in efficiency and market reach. We deep dive into the technical requirements and strategic shifts necessary for success...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
