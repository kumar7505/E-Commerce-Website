import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../Components/loader/Loader';
import { doc, getDoc } from 'firebase/firestore';

function Login() {    
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading, setLoading} = useContext(myContext);
    const navigate = useNavigate();

    const checkAddress = async(userId) => {
        const userRef = doc(fireDB, "users", userId); // Reference to the user's document

        // Get the document data
        const userDoc = await getDoc(userRef);
        console.log("User Data:", userDoc.data()); // Log the user's data
        let userData = userDoc.data().address;
        userData = {...userData, show: false, timestamp: new Date().getTime()}; // Store the current timestamp in milliseconds};
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    const logIn = async() => {
        setLoading(true);
        try{
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login Successfully");
            localStorage.setItem("user", JSON.stringify(result));
            checkAddress(result.user.uid);
            setTimeout(() => {
                setLoading(false);
            }, 300);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch(error){
            console.log(error);
            setLoading(false);
            toast.error("Error logging in, please try again later");
        }
    }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
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
                        onClick={logIn}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login