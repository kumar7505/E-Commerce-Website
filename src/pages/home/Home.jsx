import React, { useContext } from 'react'
import Layout from '../../Components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../Components/herosection/HeroSection';
import Filter from '../../Components/filter/Filter';
import ProductCard from '../../Components/productCard/ProductCard';
import Track from '../../Components/track/Track';
import Testimonial from '../../Components/testimonial/Testimonial';

const Home = () => {
    const context = useContext(myContext);
    console.log(context);
    const {name} = context;
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default Home