import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './payment.module.less';
import './paymentFail.css';
import { useSelector } from 'react-redux';

const Payment = ({status}) => {

    //success
    const [isComplete, setIsComplete] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      // Delay before starting the progress
      const loadingDelay = setTimeout(() => {
        // Progress interval
        const interval = setInterval(() => {
          setProgress(prevProgress => {
            const newProgress = prevProgress + 10;
            
            // When we reach 100%, set complete after a short delay
            if (newProgress >= 100) {
              setTimeout(() => {
                setIsComplete(true);
              }, 1000);
              clearInterval(interval);            }
            
            return newProgress;
          });
        }, 100);
        
        // Clean up interval
        return () => clearInterval(interval);
      }, 2000);
            
      // Clean up timeout
      return () => {
        clearTimeout(loadingDelay);
        setTimeout(() => {
            setSuccess(true);
            console.log("kumar");
            
        }, 6500);
        };
    }, []);
    
    // Debug function to toggle complete state
    const toggleComplete = () => {
      setIsComplete(!isComplete);
    };

    // Failure

    const cartItems = useSelector((state) => state.cart);
    let total = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);

    total += (cartItems.length * 10);
  return (
    <>
        {
            status === "success" ? 
            (
                <div className="relative font-sans w-full h-screen flex flex-col justify-center items-center p-4 bg-gray-200">
                {/* Uncomment for debug button */}
                {/* <button id="trigger" onClick={toggleComplete} className="absolute top-4 left-4 p-2 bg-gray-400 rounded">
                  Complete/Reverse (debug)
                </button> */}
                <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');
        
        * {
          box-sizing: border-box;
        }
        
        @keyframes gearRotate1 {
          to { transform: rotate(360deg); }
        }
        @keyframes gearRotate2 {
          to { transform: rotate(360deg); }
        }
        @keyframes gearRotate3 {
          to { transform: rotate(-360deg); }
        }
        @keyframes gearRotate4 {
          to { transform: rotate(360deg); }
        }
        
        @keyframes gearEnter1 {
          to { transform: rotate(10deg) translate3d(-5px, -5px, 0); }
        }
        @keyframes gearEnter2 {
          to { transform: rotate(25deg) translate3d(20px, -50px, 0); }
        }
        @keyframes gearEnter3 {
          to { transform: rotate(15deg) translate3d(-25px, -15px, 0); }
        }
        @keyframes gearEnter4 {
          to { transform: translate3d(0, 0, 0); }
        }
        
        @keyframes gearLeave1 {
          from { transform: rotate(10deg) translate3d(-5px, -5px, 0); }
          to { transform: rotate(10deg) translate3d(-40px, -60px, 0); }
        }
        @keyframes gearLeave2 {
          from { transform: rotate(25deg) translate3d(20px, -50px, 0); }
          to { transform: rotate(25deg) translate3d(70px, -130px, 0); }
        }
        @keyframes gearLeave3 {
          from { transform: rotate(15deg) translate3d(-25px, -15px, 0); }
          to { transform: rotate(15deg) translate3d(30px, 20px, 0); }
        }
        @keyframes gearLeave4 {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-70px, 70px, 0); }
        }
        
        @keyframes scale {
          to { transform: scale(1); }
        }
        
        @keyframes hideLoading {
          to { height: 0; margin: 0; opacity: 0; }
        }
        
        @keyframes fillCheckSuccess {
          to { box-shadow: inset 0 0 0 100px #3c763d; }
        }
        
        @keyframes beatCheck {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes echoSuccess {
          from { box-shadow: inset 0 0 0 100px #3c763d, 0 0 0 0 #3c763d; }
          to { box-shadow: inset 0 0 0 100px #3c763d, 0 0 0 50px transparent; }
        }
        
        @keyframes strokeCheck {
          to { stroke-dashoffset: 0px; }
        }
        
        .gear-wrapper-1 {
          top: 0;
          left: 0;
          transform: rotate(10deg) translate3d(-40px, -60px, 0);
        }

        .gear-wrapper-2 {
          top: 0;
          right: 0;
          transform: rotate(25deg) translate3d(70px, -130px, 0);
        }
        
        .gear-wrapper-3 {
          bottom: 0;
          right: 0;
          transform: rotate(15deg) translate3d(30px, 20px, 0);
        }
        
        .gear-wrapper-4 {
          bottom: 0;
          left: 0;
          transform: translate3d(-70px, 70px, 0);
        }
        
        .animate-gearRotate1 {
          animation: gearRotate1 6s linear infinite;
        }
        
        .animate-gearRotate2 {
          animation: gearRotate2 5s linear infinite;
        }
        
        .animate-gearRotate3 {
          animation: gearRotate3 7s linear infinite;
        }
        
        .animate-gearRotate4 {
          animation: gearRotate4 4s linear infinite;
        }
        
        .animate-gearEnter1 {
          animation: gearEnter1 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        
        .animate-gearEnter2 {
          animation: gearEnter2 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s forwards;
        }
        
        .animate-gearEnter3 {
          animation: gearEnter3 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s forwards;
        }
        
        .animate-gearEnter4 {
          animation: gearEnter4 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards;
        }
        
        .animate-gearLeave1 {
          animation: gearLeave1 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        
        .animate-gearLeave2 {
          animation: gearLeave2 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s forwards;
        }
        
        .animate-gearLeave3 {
          animation: gearLeave3 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s forwards;
        }
        
        .animate-gearLeave4 {
          animation: gearLeave4 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards;
        }
        
        .animate-hideLoading {
          animation: hideLoading 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.75s forwards;
        }
        
        .animate-fillCheckSuccess {
          animation: fillCheckSuccess 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 1s forwards,
                     beatCheck 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s infinite,
                     echoSuccess 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s infinite;
        }
        
        .animate-strokeCheck {
          animation: strokeCheck 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 1.3s forwards;
        }
        
        .checkmark {
          opacity: 0;
          transform: scale(0);
        }
        
        #processing.complete .checkmark {
          opacity: 1;
          transform: scale(1);
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 1s;
        }
        
        .headings {
          text-align: center;
          transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        #processing.complete .headings h1 {
          transform: translateY(-20px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
        }
        
        #processing.complete .headings h2 {
          transform: translateY(-30px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.7s;
        }
      `}</style>
                <div id="processing" className={`w-full h-screen flex flex-col justify-center items-center p-4 bg-gray-200 ${isComplete ? 'complete' : 'uncomplete'}`}>
                  <div className="headings">
                    <h1 className="text-gray-800 font-normal">Payment processing...</h1>
                    <h2 className="text-gray-500 font-light">Please wait</h2>
                  </div>
                  
                  <div className="relative mt-8">
                  {isComplete && success && (
  <h1 className="text-4xl font-extrabold text-center text-green-600 animate-bounce my-10">
    Payment Success
  </h1>
)}


                    <div className={`gears w-52 h-52 bg-gray-500 rounded-full overflow-hidden ${isComplete ? 'bg-transparent transition-colors duration-250 delay-700' : ''}`}>
                      <div className={`gear-wrapper gear-wrapper-1 absolute top-0 left-0 ${isComplete ? 'animate-gearLeave1' : 'animate-gearEnter1'}`}>
                        <svg version="1.1" className="gear gear-1 w-24 h-24 fill-gray-200 origin-center animate-gearRotate1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                          <path className="st0" d="M507.6,232.1c0,0-9.3-3.5-36.2-6c-32.9-3-42.8-15.4-53.7-30.7h-0.2c-1.4-3.6-2.8-7.2-4.4-10.8l0.1-0.1
                          c-3.1-18.6-4.8-34.3,16.3-59.7C446.7,104,450.8,95,450.8,95c-4-10.3-13.8-20-13.8-20s-9.7-9.7-20-13.8c0,0-9.1,4.1-29.8,21.4
                          c-25.4,21.1-41.1,19.4-59.7,16.3l-0.1,0.1c-3.5-1.6-7.1-3.1-10.8-4.4v-0.2c-15.3-10.9-27.7-20.9-30.7-53.7c-2.5-26.9-6-36.2-6-36.2
                          C269.8,0,256,0,256,0s-13.8,0-23.9,4.4c0,0-3.5,9.3-6,36.2c-3,32.9-15.4,42.8-30.7,53.7v0.2c-3.6,1.4-7.3,2.8-10.8,4.4l-0.1-0.1
                          c-18.6,3.1-34.3,4.8-59.7-16.3C104,65.3,95,61.2,95,61.2C84.7,65.3,75,75,75,75s-9.7,9.7-13.8,20c0,0,4.1,9.1,21.4,29.8
                          c21.1,25.4,19.4,41.1,16.3,59.7l0.1,0.1c-1.6,3.5-3.1,7.1-4.4,10.8h-0.2c-10.9,15.4-20.9,27.7-53.7,30.7c-26.9,2.5-36.2,6-36.2,6
                          C0,242.3,0,256,0,256s0,13.8,4.4,23.9c0,0,9.3,3.5,36.2,6c32.9,3,42.8,15.4,53.7,30.7h0.2c1.4,3.7,2.8,7.3,4.4,10.8l-0.1,0.1
                          c3.1,18.6,4.8,34.3-16.3,59.7C65.3,408,61.2,417,61.2,417c4.1,10.3,13.8,20,13.8,20s9.7,9.7,20,13.8c0,0,9-4.1,29.8-21.4
                          c25.4-21.1,41.1-19.4,59.7-16.3l0.1-0.1c3.5,1.6,7.1,3.1,10.8,4.4v0.2c15.3,10.9,27.7,20.9,30.7,53.7c2.5,26.9,6,36.2,6,36.2
                          C242.3,512,256,512,256,512s13.8,0,23.9-4.4c0,0,3.5-9.3,6-36.2c3-32.9,15.4-42.8,30.7-53.7v-0.2c3.7-1.4,7.3-2.8,10.8-4.4l0.1,0.1
                          c18.6-3.1,34.3-4.8,59.7,16.3c20.8,17.3,29.8,21.4,29.8,21.4c10.3-4.1,20-13.8,20-13.8s9.7-9.7,13.8-20c0,0-4.1-9.1-21.4-29.8
                          c-21.1-25.4-19.4-41.1-16.3-59.7l-0.1-0.1c1.6-3.5,3.1-7.1,4.4-10.8h0.2c10.9-15.3,20.9-27.7,53.7-30.7c26.9-2.5,36.2-6,36.2-6
                          C512,269.8,512,256,512,256S512,242.2,507.6,232.1z M256,375.7c-66.1,0-119.7-53.6-119.7-119.7S189.9,136.3,256,136.3
                          c66.1,0,119.7,53.6,119.7,119.7S322.1,375.7,256,375.7z" />
                        </svg>
                      </div>
                      
                      <div className={`gear-wrapper gear-wrapper-2 absolute top-0 right-0 ${isComplete ? 'animate-gearLeave2' : 'animate-gearEnter2'}`}>
                        <svg version="1.1" className="gear gear-2 w-36 h-36 fill-gray-200 origin-center animate-gearRotate2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                          <path className="st0" d="M507.6,232.1c0,0-9.3-3.5-36.2-6c-32.9-3-42.8-15.4-53.7-30.7h-0.2c-1.4-3.6-2.8-7.2-4.4-10.8l0.1-0.1
                          c-3.1-18.6-4.8-34.3,16.3-59.7C446.7,104,450.8,95,450.8,95c-4-10.3-13.8-20-13.8-20s-9.7-9.7-20-13.8c0,0-9.1,4.1-29.8,21.4
                          c-25.4,21.1-41.1,19.4-59.7,16.3l-0.1,0.1c-3.5-1.6-7.1-3.1-10.8-4.4v-0.2c-15.3-10.9-27.7-20.9-30.7-53.7c-2.5-26.9-6-36.2-6-36.2
                          C269.8,0,256,0,256,0s-13.8,0-23.9,4.4c0,0-3.5,9.3-6,36.2c-3,32.9-15.4,42.8-30.7,53.7v0.2c-3.6,1.4-7.3,2.8-10.8,4.4l-0.1-0.1
                          c-18.6,3.1-34.3,4.8-59.7-16.3C104,65.3,95,61.2,95,61.2C84.7,65.3,75,75,75,75s-9.7,9.7-13.8,20c0,0,4.1,9.1,21.4,29.8
                          c21.1,25.4,19.4,41.1,16.3,59.7l0.1,0.1c-1.6,3.5-3.1,7.1-4.4,10.8h-0.2c-10.9,15.4-20.9,27.7-53.7,30.7c-26.9,2.5-36.2,6-36.2,6
                          C0,242.3,0,256,0,256s0,13.8,4.4,23.9c0,0,9.3,3.5,36.2,6c32.9,3,42.8,15.4,53.7,30.7h0.2c1.4,3.7,2.8,7.3,4.4,10.8l-0.1,0.1
                          c3.1,18.6,4.8,34.3-16.3,59.7C65.3,408,61.2,417,61.2,417c4.1,10.3,13.8,20,13.8,20s9.7,9.7,20,13.8c0,0,9-4.1,29.8-21.4
                          c25.4-21.1,41.1-19.4,59.7-16.3l0.1-0.1c3.5,1.6,7.1,3.1,10.8,4.4v0.2c15.3,10.9,27.7,20.9,30.7,53.7c2.5,26.9,6,36.2,6,36.2
                          C242.3,512,256,512,256,512s13.8,0,23.9-4.4c0,0,3.5-9.3,6-36.2c3-32.9,15.4-42.8,30.7-53.7v-0.2c3.7-1.4,7.3-2.8,10.8-4.4l0.1,0.1
                          c18.6-3.1,34.3-4.8,59.7,16.3c20.8,17.3,29.8,21.4,29.8,21.4c10.3-4.1,20-13.8,20-13.8s9.7-9.7,13.8-20c0,0-4.1-9.1-21.4-29.8
                          c-21.1-25.4-19.4-41.1-16.3-59.7l-0.1-0.1c1.6-3.5,3.1-7.1,4.4-10.8h0.2c10.9-15.3,20.9-27.7,53.7-30.7c26.9-2.5,36.2-6,36.2-6
                          C512,269.8,512,256,512,256S512,242.2,507.6,232.1z M256,375.7c-66.1,0-119.7-53.6-119.7-119.7S189.9,136.3,256,136.3
                          c66.1,0,119.7,53.6,119.7,119.7S322.1,375.7,256,375.7z" />
                        </svg>
                      </div>
                      
                      <div className={`gear-wrapper gear-wrapper-3 absolute bottom-0 right-0 ${isComplete ? 'animate-gearLeave3' : 'animate-gearEnter3'}`}>
                        <svg version="1.1" className="gear gear-3 w-16 h-16 fill-gray-200 origin-center animate-gearRotate3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                          <path className="st0" d="M507.6,232.1c0,0-9.3-3.5-36.2-6c-32.9-3-42.8-15.4-53.7-30.7h-0.2c-1.4-3.6-2.8-7.2-4.4-10.8l0.1-0.1
                          c-3.1-18.6-4.8-34.3,16.3-59.7C446.7,104,450.8,95,450.8,95c-4-10.3-13.8-20-13.8-20s-9.7-9.7-20-13.8c0,0-9.1,4.1-29.8,21.4
                          c-25.4,21.1-41.1,19.4-59.7,16.3l-0.1,0.1c-3.5-1.6-7.1-3.1-10.8-4.4v-0.2c-15.3-10.9-27.7-20.9-30.7-53.7c-2.5-26.9-6-36.2-6-36.2
                          C269.8,0,256,0,256,0s-13.8,0-23.9,4.4c0,0-3.5,9.3-6,36.2c-3,32.9-15.4,42.8-30.7,53.7v0.2c-3.6,1.4-7.3,2.8-10.8,4.4l-0.1-0.1
                          c-18.6,3.1-34.3,4.8-59.7-16.3C104,65.3,95,61.2,95,61.2C84.7,65.3,75,75,75,75s-9.7,9.7-13.8,20c0,0,4.1,9.1,21.4,29.8
                          c21.1,25.4,19.4,41.1,16.3,59.7l0.1,0.1c-1.6,3.5-3.1,7.1-4.4,10.8h-0.2c-10.9,15.4-20.9,27.7-53.7,30.7c-26.9,2.5-36.2,6-36.2,6
                          C0,242.3,0,256,0,256s0,13.8,4.4,23.9c0,0,9.3,3.5,36.2,6c32.9,3,42.8,15.4,53.7,30.7h0.2c1.4,3.7,2.8,7.3,4.4,10.8l-0.1,0.1
                          c3.1,18.6,4.8,34.3-16.3,59.7C65.3,408,61.2,417,61.2,417c4.1,10.3,13.8,20,13.8,20s9.7,9.7,20,13.8c0,0,9-4.1,29.8-21.4
                          c25.4-21.1,41.1-19.4,59.7-16.3l0.1-0.1c3.5,1.6,7.1,3.1,10.8,4.4v0.2c15.3,10.9,27.7,20.9,30.7,53.7c2.5,26.9,6,36.2,6,36.2
                          C242.3,512,256,512,256,512s13.8,0,23.9-4.4c0,0,3.5-9.3,6-36.2c3-32.9,15.4-42.8,30.7-53.7v-0.2c3.7-1.4,7.3-2.8,10.8-4.4l0.1,0.1
                          c18.6-3.1,34.3-4.8,59.7,16.3c20.8,17.3,29.8,21.4,29.8,21.4c10.3-4.1,20-13.8,20-13.8s9.7-9.7,13.8-20c0,0-4.1-9.1-21.4-29.8
                          c-21.1-25.4-19.4-41.1-16.3-59.7l-0.1-0.1c1.6-3.5,3.1-7.1,4.4-10.8h0.2c10.9-15.3,20.9-27.7,53.7-30.7c26.9-2.5,36.2-6,36.2-6
                          C512,269.8,512,256,512,256S512,242.2,507.6,232.1z M256,375.7c-66.1,0-119.7-53.6-119.7-119.7S189.9,136.3,256,136.3
                          c66.1,0,119.7,53.6,119.7,119.7S322.1,375.7,256,375.7z" />
                        </svg>
                      </div>
                      
                      <div className={`gear-wrapper gear-wrapper-4 absolute bottom-0 left-0 ${isComplete ? 'animate-gearLeave4' : 'animate-gearEnter4'}`}>
                        <svg version="1.1" className="gear gear-4 w-28 h-28 fill-gray-200 origin-center animate-gearRotate4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                          <path className="st0" d="M507.6,232.1c0,0-9.3-3.5-36.2-6c-32.9-3-42.8-15.4-53.7-30.7h-0.2c-1.4-3.6-2.8-7.2-4.4-10.8l0.1-0.1
                          c-3.1-18.6-4.8-34.3,16.3-59.7C446.7,104,450.8,95,450.8,95c-4-10.3-13.8-20-13.8-20s-9.7-9.7-20-13.8c0,0-9.1,4.1-29.8,21.4
                          c-25.4,21.1-41.1,19.4-59.7,16.3l-0.1,0.1c-3.5-1.6-7.1-3.1-10.8-4.4v-0.2c-15.3-10.9-27.7-20.9-30.7-53.7c-2.5-26.9-6-36.2-6-36.2
                          C269.8,0,256,0,256,0s-13.8,0-23.9,4.4c0,0-3.5,9.3-6,36.2c-3,32.9-15.4,42.8-30.7,53.7v0.2c-3.6,1.4-7.3,2.8-10.8,4.4l-0.1-0.1
                          c-18.6,3.1-34.3,4.8-59.7-16.3C104,65.3,95,61.2,95,61.2C84.7,65.3,75,75,75,75s-9.7,9.7-13.8,20c0,0,4.1,9.1,21.4,29.8
                          c21.1,25.4,19.4,41.1,16.3,59.7l0.1,0.1c-1.6,3.5-3.1,7.1-4.4,10.8h-0.2c-10.9,15.4-20.9,27.7-53.7,30.7c-26.9,2.5-36.2,6-36.2,6
                          C0,242.3,0,256,0,256s0,13.8,4.4,23.9c0,0,9.3,3.5,36.2,6c32.9,3,42.8,15.4,53.7,30.7h0.2c1.4,3.7,2.8,7.3,4.4,10.8l-0.1,0.1
                          c3.1,18.6,4.8,34.3-16.3,59.7C65.3,408,61.2,417,61.2,417c4.1,10.3,13.8,20,13.8,20s9.7,9.7,20,13.8c0,0,9-4.1,29.8-21.4
                          c25.4-21.1,41.1-19.4,59.7-16.3l0.1-0.1c3.5,1.6,7.1,3.1,10.8,4.4v0.2c15.3,10.9,27.7,20.9,30.7,53.7c2.5,26.9,6,36.2,6,36.2
                          C242.3,512,256,512,256,512s13.8,0,23.9-4.4c0,0,3.5-9.3,6-36.2c3-32.9,15.4-42.8,30.7-53.7v-0.2c3.7-1.4,7.3-2.8,10.8-4.4l0.1,0.1
                          c18.6-3.1,34.3-4.8,59.7,16.3c20.8,17.3,29.8,21.4,29.8,21.4c10.3-4.1,20-13.8,20-13.8s9.7-9.7,13.8-20c0,0-4.1-9.1-21.4-29.8
                          c-21.1-25.4-19.4-41.1-16.3-59.7l-0.1-0.1c1.6-3.5,3.1-7.1,4.4-10.8h0.2c10.9-15.3,20.9-27.7,53.7-30.7c26.9-2.5,36.2-6,36.2-6
                          C512,269.8,512,256,512,256S512,242.2,507.6,232.1z M256,375.7c-66.1,0-119.7-53.6-119.7-119.7S189.9,136.3,256,136.3
                          c66.1,0,119.7,53.6,119.7,119.7S322.1,375.7,256,375.7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className={`loading-bar relative w-52 h-3 mt-12 bg-gray-200 rounded-lg overflow-hidden ${isComplete ? 'animate-hideLoading' : ''}`} data-progress={progress}>
                      <span className="absolute top-0 left-0 h-full bg-gray-500" style={{ width: `${progress}%` }}></span>
                    </div>
                    
                    <svg className={`checkmark checkmark-success w-24 h-24 absolute top-1/2 left-1/2 -mt-12 -ml-12 block rounded-full stroke-white stroke-1 ${isComplete ? 'animate-fillCheckSuccess' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <circle className={`checkmark-circle fill-none stroke-green-600 stroke-dasharray-200 stroke-dashoffset-200 ${isComplete ? 'animate-strokeCheck' : ''}`} cx="25" cy="25" r="25" />
                      <path className={`checkmark-check stroke-white stroke-dasharray-100 stroke-dashoffset-100 ${isComplete ? 'animate-strokeCheck' : ''}`} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                </div>
              </div>

            ) : 
            (
                <div className="container">
                    <div class="container">
    <style jsx>
        {`
        /* Ensure background color is red and overriding any conflicting styles */
        .failure-icon {
            font-size: 50px; /* Increase the size of the icon */
            color: white !important; /* Force the icon color to white */
            background-color: red !important; /* Force the background color to be red */
            width: 80px; /* Width of the circle */
            height: 80px; /* Height of the circle */
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%; /* Make it a circle */
            animation: jump 0.6s ease-in-out infinite; /* Jumping animation */
        }

        /* Jumping animation keyframes */
        @keyframes jump {
            0% {
                transform: translateY(0); /* Starting position */
            }
            50% {
                transform: translateY(-10px); /* Move up */
            }
            100% {
                transform: translateY(0); /* Back to the starting position */
            }
        }
        `}
    </style>
    <div class="printer-top"></div>
    
    <div class="paper-container">
        <div class="printer-bottom"></div>

        <div class="paper">
            <div class="main-contents">
                <div class="mx-auto mb-3 pb-1 failure-icon rounded-full">&#9888;</div>

                <div class="success-title">
                    Payment Failed
                </div>
                <div class="success-description">
                    Your payment for ₹{total} in INR has not been processed.
                </div>
                <div class="order-details">
                    <div class="order-number-label">Payment id</div>
                    <div class="order-number">JPZZ1V-WQRR94-78E1VE</div>
                </div>
                <div class="order-footer">You can close this page!</div>
            </div>
            <div class="jagged-edge"></div>
        </div>
    </div>
</div>

                </div>
            )
        }
    </>
  )
}

export default Payment