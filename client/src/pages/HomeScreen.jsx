import Hero from '../components/Hero';
import Feature from '../components/Feature';
import FeatureProduct from '../components/FeatureProduct';
import HomeBanner from '../components/HomeBanner';
import NewArrival from '../components/NewArrival';
import HomeSmallBanner from '../components/HomeSmallBanner';
import HomeBanner3 from '../components/HomeBanner3';
import NewsLetter from '../components/NewsLetter';
import { Helmet } from 'react-helmet-async';

const HomeScreen = () => {

  return (
    <div>
      <Helmet>
        <title>Cara | Fashion Store</title>
        <meta name="description" content="Welcome to our fashion store! Shop the latest trends and accessories." />
      </Helmet>
      <Hero />

      <Feature />

      <FeatureProduct />
      <HomeBanner />
      <NewArrival />
      <HomeSmallBanner />
      <HomeBanner3 />
      <NewsLetter />
    </div>
  );
};

export default HomeScreen;
