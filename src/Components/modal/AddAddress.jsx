import React, { useContext, useState } from 'react';
import './AddAddress.module.scss';
import myContext from '../../context/data/myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';

const AddAddress = ({setShowAddress}) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const {loading, setLoading} = useContext(myContext);
    const [address, setAddress] = useState({
        doorAddress: userData.doorAddress,
        area: userData.area,
        city: userData.city,
        state: userData.state,
        pinCode: userData.pinCode,    
        show: true,
        timeStamp: new Date().getTime(),
    });

    const clearData = () => {
        setAddress({
            doorAddress: "",
            area: "",       
            city: "",
            state: "",
            pinCode: "",
            show: true,
            timeStamp: new Date().getTime(),
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.user.uid;
        console.log(userId);
        
        try {
            const userRef = doc(fireDB, "users", userId); // Reference to the user's document
            const userSync = await getDoc(userRef);
            console.log(userRef);
            
            // Check if the user document exists
            if (userSync.exists()) {
                // If the document exists, update the address
                await updateDoc(userRef, { address: address });
                toast.success("Address added successfully");
                localStorage.removeItem("userData");
                console.log(address);
                
                localStorage.setItem("userData", JSON.stringify(address));
            } else {
                toast.error("User document does not exist. Please try again later.");
            }
            setTimeout(() => {
                setLoading(false);
                setShowAddress(false);
            }, 100);
        } catch(e) {
            toast.error("Error adding address, please try again later" + e.message);
            console.log(e);
        }
    }

  return (
    <div className="address fixed inset-0 z-50 mx-auto bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen ">
            {loading && <Loader />}
            <form className="w-[40%]" onSubmit={handleSubmit}>
            
                <div class="segment text-center gap-3">
                    <h1 className="text-center text-3xl m-5 font-bold text-gray-500 drop-shadow-sm">Delivery Address</h1>
                </div>
                <div className="flex flex-col gap-1">
                    <input type="text" onChange={(e) => setAddress({...address, doorAddress: e.target.value})} value={address.doorAddress} required placeholder={`Door Address*`}/>
                    <input type="text" onChange={(e) => setAddress({...address, area: e.target.value})} value={address.area} placeholder="Area"/>
                    <input type="text" onChange={(e) => setAddress({...address, city: e.target.value})} value={address.city}required placeholder="city*"/>
                    <input type="text" onChange={(e) => setAddress({...address, state: e.target.value})} value={address.state} required placeholder="State*"/>
                    <input type="text" onChange={(e) => setAddress({...address, pinCode: e.target.value})} value={address.pinCode} placeholder="Pin Code"/>
                    <button onClick={clearData} className='text-red-500 bg-transparent'  style={{textShadow: '0.1px 0.2px 0.4px red'}}><i class="icon ion-md-undo"> Reset Address</i></button>
                    <button type='submit' className='text-green-500'  style={{textShadow: '0.1px 0.2px 0.4px green'}}>Confirm Address</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddAddress