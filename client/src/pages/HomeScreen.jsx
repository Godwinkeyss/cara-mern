import Hero from '../components/Hero';
import Feature from '../components/Feature';
import FeatureProduct from '../components/FeatureProduct';
import HomeBanner from '../components/HomeBanner';
import NewArrival from '../components/NewArrival';
import HomeSmallBanner from '../components/HomeSmallBanner';
import HomeBanner3 from '../components/HomeBanner3';
import NewsLetter from '../components/NewsLetter';


const HomeScreen = () => {

  return (
    <div>
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
