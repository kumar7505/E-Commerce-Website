import React, { useContext, useEffect, useState, Fragment, memo, use } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../Components/layout/Layout';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteFromCart } from '../../redux/cartSlice';
import { Dialog, Transition } from '@headlessui/react'
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import AddAddress from '../../Components/modal/AddAddress';

const Cart = memo(() => {

  const context = useContext(myContext)
  const { mode, setPayment } = context;
  
  const cartItems = useSelector((state) => state.cart, shallowEqual);
  const dispatch = useDispatch(); 
  const [showAddress, setShowAddress] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart successfully");
  }

  useEffect(() => {
    console.log("maintha");
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    console.log(total);
    
    setTotalAmount(total);
  }, [cartItems]); // Recalculate total whenever cartItems changes

  //modal
  
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
      setIsOpen(false)
  }

  function openModal() {
      setIsOpen(true)
      const createBill = () => ({
        id: Date.now() + Math.random(),
        delay: Math.random() * 0.3,
        y: Math.random() * 20 - 10, // Random y position between -10 and 10
        rotation: Math.random() * 20 - 10, // Random initial rotation
        scale: Math.random() * 0.3 + 0.7 // Random scale between 0.7 and 1
      });
    
      // Create initial bills
      setBills(Array.from({ length: 3 }, createBill));
    
      const interval = setInterval(() => {
        const newBill = createBill();
        
        setBills(current => [...current, newBill]);
        
        setTimeout(() => {
          setBills(current => current.filter(b => b.id !== newBill.id));
        }, 2500);
      }, 800);
      
      return () => clearInterval(interval);
  }

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const handleAddress = async() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setShowAddress(true);
  }

  const handleCheckout = async () => {
    const userAddress = JSON.parse(localStorage.getItem("userData"));
    
    console.log(userAddress);
    
    if(userAddress === null || !userAddress?.show){
      console.log("kumar");
      
      handleAddress();
      return;
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const currentTimestamp = new Date().getTime();
      const storedTimestamp = userData.timestamp;

      const hoursPassed = (currentTimestamp - storedTimestamp) / (1000 * 60 * 60); 

      if (hoursPassed > 24) {
        handleAddress();
        return;
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const stripe = await stripePromise;
    openModal();
    
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [...cartItems, {title: "Shipping Amount", price: cartItems.length * 10}] }),
      });
        
      
      
      if(response.status === 400) {
        return toast.error("Error in creating checkout session");
      }
      
      setPayment(true);
      const session = await response.json();
      toast.success("Redirecting to checkout page");
      console.log(session.id);
      await stripe.redirectToCheckout({ sessionId: session.id });

      closeModal();
    };
    

    //loader
    const [bills, setBills] = useState([]);


    return (
      <Layout >
        <div className="min-h-screen bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto pb-20 max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 relative">
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((item, index) => (
                <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <div className="w-full sm:w-40 aspect-w-16 aspect-h-9">
                    <img src={item.imageUrl} alt="product-image" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                      <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                    </div>
                    <div onClick={() => deleteCart(item)} className="mt-4 cursor-pointer flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6" >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{cartItems.length * 10}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                <div className>
                  <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount + (cartItems.length * 10)}</p>
                </div>
              </div>
              {/* <Modal  /> */}
            <div className="  text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={handleCheckout}
                    // onClick={openModal}
                    className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold bg-violet-600"
                >
                    Buy Now
                </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center px-8 md:flex-row md:space-x-24">
              
              {/* Left Loader */}
              <motion.div 
                className={`relative w-36 h-36 flex items-center justify-center transform transition-transform duration-400 ease-out z-10`}
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  rotate: [-5, 0, -5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 border-4 border-gray-300 border-t-violet-600 rounded-full animate-spin shadow-md"></div>
                  <div className="w-[95%] h-[95%] flex items-center justify-center bg-white rounded-full shadow-md">
                    <motion.img 
                      src="/bank.png" 
                      alt="bank" 
                      className="w-3/5 h-3/5 object-contain"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                </div>
              </motion.div>

              {/* Connecting Line with Message */}
              <div className="relative py-2 flex flex-col items-center justify-center w-full md:w-40 md:py-0">
              {/* Base line with gradient and glow */}
                <div className="w-[150%] h-1.5 bg-gradient-to-r from-violet-400 via-violet-600 to-violet-400 rounded-full absolute z-0 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                
                {/* Animated background line */}
                  <motion.div 
                    className="w-[170%] h-1 bg-gradient-to-r from-violet-300 to-violet-500 rounded-full absolute z-0 opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                {/* Moving bills */}
                  {bills.map((bill) => (
                    <motion.div
                      key={bill.id}
                      className="absolute z-10"
                      initial={{ 
                        x: '-10%',
                        y: bill.y,
                        scale: 0,
                        opacity: 0,
                        rotate: bill.rotation
                      }}
                      animate={{
                        x: '110%',
                        y: [bill.y, bill.y - 15, bill.y],
                        scale: [0, bill.scale, 0],
                        opacity: [0, 1, 0],
                        rotate: [bill.rotation, bill.rotation + 360, bill.rotation + 720]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: bill.delay,
                        ease: "easeInOut"
                      }}
                    >
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                        alt="dollar bill"
                        className="w-12 h-8 object-contain"
                        style={{ 
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          transform: `scale(${bill.scale})`
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Right Loader */}
                <motion.div 
                className={`relative w-36 h-36 flex items-center justify-center transform transition-transform duration-400 ease-out `}
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  rotate: [5, 0, 5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                >
                <div className="absolute inset-0 border-4 border-gray-300 border-t-violet-600 rounded-full animate-spin shadow-md"></div>
                <div className="w-[95%] h-[95%] flex items-center justify-center bg-white rounded-full shadow-md">
                  <motion.img 
                    src="/banking.png" 
                    alt="mobile"
                    className="w-3/5 h-3/5 object-contain"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </Transition>

        {showAddress && (<AddAddress setShowAddress={setShowAddress}/>)}
      </div>
    </Layout>
  )
});

export default Cart