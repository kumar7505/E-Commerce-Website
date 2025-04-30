import React, { useEffect, useState } from 'react'
import myContext from './myContext'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';

const MyState = (props) => {
    const [mode, setMode] = useState("light");
    const [payment, setPayment] = useState(false);

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
      price: null,
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

    const addProduct = async() => {
      if(products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null){
        return toast.error("Please fill all the fields")
      }
      setLoading(true);
      try{  
        const productRef = collection(fireDB, 'products')
        console.log(productRef);
        
        await addDoc(productRef, products);
        toast.success("Product added successfully");
        getProductData();

        setTimeout(() => {
          setLoading(false);
        } ,400);

        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 300);
      
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

    // Update product

    const editHandle = async(item) => {
      setProducts(item);
    }

    const updateProduct = async() => {
      setLoading(true);
      try{
        console.log('kumar');
        
        await setDoc(doc(fireDB, 'products', products.id), products)
        toast.success("Product updated successfully");
        getProductData();
        setTimeout(() => {
          setLoading(false);
        } ,400);
        setTimeout(() => {
          window.location.href = '/dashboard'; 
        }, 800);
      } catch(e){
        toast.error("Error updating product: ", e.message);
        setLoading(false);
      }
    }

    const deleteProduct = async(item) => {
      setLoading(true);
      try{
        await deleteDoc(doc(fireDB, 'products', item.id));
        toast.success("Product deleted successfully");
        getProductData();
        setLoading(false);
      } catch(e){
        toast.error("Error deleting product: ", e.message);
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
          addProduct,
          product,

          editHandle,
          updateProduct,
          deleteProduct,

          payment,
          setPayment
        }}
    >
        {props.children}
    </myContext.Provider>
  )
}

export default MyState;