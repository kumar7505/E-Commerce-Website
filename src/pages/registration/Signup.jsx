import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import Loader from '../../Components/loader/Loader';

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading, setLoading} = useContext(myContext);
    const navigate = useNavigate();
   
    const signUp = async() => {
        if(name==="" || email==="" || password===""){
            return toast.error("Please fill all the fields"); 
            
        }
        setLoading(true);
        try{
            const users = await createUserWithEmailAndPassword(auth, email, password);
            console.log(users);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now(),
                address: {
                    doorAddress: "",
                    area: "",       
                    city: "",
                    state: "",
                    pinCode: ""
                },
            }

            const useRef = doc(fireDB, "users", user.uid);
            await setDoc(useRef, user);
            toast.success("Signup Succesfully")
            setEmail("");
            setName("");
            setPassword("");
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch(error){
            console.log(error);
            setLoading(false);
            toast.error("Error creating account, please try again later");
        }
    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signUp}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup