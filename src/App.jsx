import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

// Lazy loaded components
const Footer = lazy(() => import('./components/Footer'));
const StickyContactBar = lazy(() => import('./components/StickyContactBar'));

// Lazy loaded pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Aboutlearnmore = lazy(() => import('./pages/Aboutlearnmore'));
const RealEstateCaseStudy = lazy(() => import('./pages/RealEstateCaseStudy'));
const WebContentOptimization = lazy(() => import('./pages/WebContentOptimization'));
const Products = lazy(() => import('./pages/Products'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Site360Detail = lazy(() => import('./pages/Site360Detail'));
const DataAndAI = lazy(() => import('./pages/DataAndAI'));
const ApplicationServices = lazy(() => import('./pages/ApplicationServices'));
const TechnologyConsulting = lazy(() => import('./pages/TechnologyConsulting'));
const AISalesAssistant = lazy(() => import('./pages/AISalesAssistant'));
const SupervisorAgent = lazy(() => import('./pages/SupervisorAgent'));
const AEMCloudMigration = lazy(() => import('./pages/AEMCloudMigration'));

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Suspense fallback={null}>
          <StickyContactBar />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#050B1C]">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/real-estate-ai" element={<RealEstateCaseStudy />} />
            <Route path="/blogs/WebContentOptimization" element={<WebContentOptimization />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-journey" element={<Aboutlearnmore />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/site360" element={<Site360Detail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/services/applicationServices" element={<ApplicationServices />} />
            <Route path="/services/dataandai" element={<DataAndAI />} />
            <Route path="/services/technology" element={<TechnologyConsulting />} />
            <Route path="/solutions/ai-sales-assistant" element={<AISalesAssistant />} />
            <Route path="/solutions/supervisor-agent" element={<SupervisorAgent />} />
            <Route path="/solutions/Fortune-50-AEM-Cloud-Migration" element={<AEMCloudMigration />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
};


export default App;