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
import Products from './pages/Products';
import Solutions from './pages/Solutions';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/real-estate-ai" element={<RealEstateCaseStudy />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-journey" element={<Aboutlearnmore />} />
          <Route path="/products" element={<Products />} />
          <Route path="/solutions" element={<Solutions />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
};


export default App;