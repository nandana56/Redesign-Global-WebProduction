import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import BlogPost from './pages/BlogPost';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Aboutlearnmore from './pages/Aboutlearnmore';
import RealEstateCaseStudy from './pages/RealEstateCaseStudy';
import WebContentOptimization from './pages/WebContentOptimization';
import Products from './pages/Products';
import Solutions from './pages/Solutions';
import Site360Detail from './pages/Site360Detail';
import DataAndAI from './pages/DataAndAI';
import ApplicationServices from './pages/ApplicationServices';
import TechnologyConsulting from './pages/TechnologyConsulting';
import ScrollToTopArrow from './components/ScrollToTopArrow';
import StickyContactBar from './components/StickyContactBar';
import AISalesAssistant from './pages/AISalesAssistant';
import SupervisorAgent from './pages/SupervisorAgent';
import AEMCloudMigration from './pages/AEMCloudMigration';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <StickyContactBar />
      <div className="min-h-screen">
        <Navbar />
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
        <Footer />
      </div>
    </Router>
  );
};


export default App;