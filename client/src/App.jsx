import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Feature from './components/Feature';
import FeatureProduct from './components/FeatureProduct';
import HomeBanner from './components/HomeBanner';
import NewArrival from './components/NewArrival';
import HomeSmallBanner from './components/HomeSmallBanner';
import HomeBanner3 from './components/HomeBanner3';
import NewsLetter from './components/NewsLetter';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />

      <Hero />

      <Feature />

      <FeatureProduct />
      <HomeBanner />
      <NewArrival />
      <HomeSmallBanner />
      <HomeBanner3 />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default App;
