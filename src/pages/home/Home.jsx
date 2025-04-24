import React, { useContext } from 'react'
import Layout from '../../Components/layout/Layout'
import HeroSection from '../../Components/herosection/HeroSection';
import Filter from '../../Components/filter/Filter';
import ProductCard from '../../Components/productCard/ProductCard';
import Track from '../../Components/track/Track';
import Testimonial from '../../Components/testimonial/Testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';

const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const addCart = () => {
    dispatch(addToCart("shirt"))
  }
  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"))
  }

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