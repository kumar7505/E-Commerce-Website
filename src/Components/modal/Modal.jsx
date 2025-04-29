import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

export default function Modal() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const cartItems = useSelector((state) => state.cart);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        openModal();
        
        const response = await fetch("http://localhost:5000/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [...cartItems, {title: "Shipping Amount", price: cartItems.length * 10}] }),
        });
        console.log("kumar");
        
    
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
    };

    return (
        <>
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

            <Transition appear show={isOpen} as={Fragment}>
                <img className="w-24 h-auto" src="/bank.png" alt="" />
                <img className="w-24 h-auto" src="/banking.png" alt="" />
            </Transition>
        </>
    )
}