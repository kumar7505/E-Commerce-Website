import React, { useContext } from 'react'
import Layout from '../../Components/layout/Layout'
import myContext from '../../context/data/myContext'

const Home = () => {
    const context = useContext(myContext);
    console.log(context);
    const {name} = context;
  return (
    <Layout>
        Home
    </Layout>
  )
}

export default Home