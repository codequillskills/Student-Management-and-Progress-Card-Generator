import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import PublicNotices from '../components/PublicNotices';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

function Home() {
  return (
    <div className="home">
      <Header />
      <Hero />
      <AboutUs />
      <PublicNotices />
      <Contact/>
      <Footer />
    </div>
  );
}

export default Home;