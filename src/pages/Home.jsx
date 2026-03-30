import React from 'react';
import HeroPartnership from '../components/HeroPartnership';
import InnovationIntroduction from '../components/InnovationIntroduction';
import ServicesVariety from '../components/ServicesVariety';
import IndustryArticles from '../components/IndustryArticles';
import Ladder7Partnership from '../components/Ladder7Partnership';

const Home = () => {
    return (
        <main className="">
            <HeroPartnership />
            <InnovationIntroduction />
            <ServicesVariety />
            <IndustryArticles />
            <Ladder7Partnership />
        </main>
    );
};

export default Home;
