import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import { onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';

const MyState = (props) => {
    const [mode, setMode] = useState("light");

    const toggleMode = () => {
      if(mode === "light"){
        setMode("dark");
        document.body.style.backgroundColor = "rgb(17, 24, 39)"
      } else {
        setMode("light");
        document.body.style.backgroundColor = "#fff";
      }
    }

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
      title: null,
      proce: null,
      imageUrl: null,
      category: null,
      description: null,
      time: Timestamp.now(),
      date: new Date().toLocaleDateString(
        'en-US',
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),
    });

    const addProducts = async() => {
      if(products.title === null || products.proce === null || products.imageUrl === null || products.category === null || products.description === null){
        return toast.error("Please fill all the fields")
      }
      setLoading(true);
      try{  
        const productRef = collection(fireDB, 'products')
        await addDoc(productRef, products);
        toast.success("Product added successfully");
        getProductData();
        setLoading(false);
      } catch(error){
        toast.error("Error adding product: ", error.message);
        setLoading(false);
      }
    }

    const [product, setProduct] = useState([]);

    const getProductData = async() => {
      setLoading(true);
      try{
        const q = query(
          collection(fireDB, "products"),
          orderBy("time", "desc")
        );
        const data = onSnapshot(q, (QuerySnapShot) => {
          let productArray = [];
          QuerySnapShot.forEach((doc)=>{
            productArray.push({ ...doc.data(), id: doc.id });
          });
          
          setProduct(productArray);
          setLoading(false);  
        })
      } catch(error){
        toast.error("Error fetching product data: ", error.message);
        setLoading(false);
      }
    }

    useEffect(() => {
      getProductData();
    }, []); 

  return (
    <myContext.Provider
        value={{
          mode,
          toggleMode,
          loading, 
          setLoading,
          
          products,
          setProducts,  
          addProducts,
          product,
        }}
    >
        {props.children}
    </myContext.Provider>
  )
}

export default MyState;