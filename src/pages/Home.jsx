import React, { Suspense, lazy } from 'react';
import HeroPartnership from '../components/HeroPartnership';

// Lazy load below-the-fold components
const InnovationIntroduction = lazy(() => import('../components/InnovationIntroduction'));
const ServicesVariety = lazy(() => import('../components/ServicesVariety'));
const CustomerStory = lazy(() => import('../components/CustomerStory'));
const IndustryArticles = lazy(() => import('../components/IndustryArticles'));
const Ladder7Partnership = lazy(() => import('../components/Ladder7Partnership'));

const Home = () => {
    return (
        <main className="">
            <HeroPartnership />
            <Suspense fallback={<div className="h-[50vh] w-full flex items-center justify-center bg-[#050B1C]">Loading...</div>}>
                <InnovationIntroduction />
                <ServicesVariety />
                <CustomerStory />
                <IndustryArticles />
                <Ladder7Partnership />
            </Suspense>
        </main>
    );
};

export default Home;
