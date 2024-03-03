"use client"

import { useContext, useRef, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { FormError } from "../from-error";
import { FormSuccess } from "../from-success";
// import { login } from "@/actions/login";
import axios from "axios";
import { AppContext } from "@/context/StoryContext";

export default function UserRegisterModal(){
    const { push } = useRouter();
    const [isPending, startTransition] = useTransition()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [publicAddress, setPublicAddress] = useState(null);
    
    const [password, setPassword] = useState("");

    const { setUserLoggedIn, authUserData, setAuthUserData } = useContext(AppContext)
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const publicAddressRef = useRef(null);
    const passwordRef = useRef(null);
    
    const modalRef = useRef(null);



    const submitData = async () => {
        try {            
            if (!validateCredentials()) {
                return;    
            }
    
            const payload = {
                name: name,
                email: email,
                password: password,
            }

            setLoading(true)
    
            const response = await axios.post("/api/auth/admin/register", payload)
            setUserLoggedIn(true)
            closeModal()

            setAuthUserData(response?.data?.data)

            if (localStorage) {
                localStorage.setItem("user", JSON.stringify(response?.data?.data))
            }
         
        } catch (error) {
            console.log(error);
            let error_msg = "Something went wrong"
            setError(error_msg)
        }finally{
            setLoading(false)
        }

    }



    const validateCredentials = () => {
        setError("")

        if (!name) {
            setError("Username is required")
            return false
        }

        if (!email) {
            setError("Email is required")
            return false
        }

        if (!password) {
            setError("Password is required")
            return false
        }
        return true
    }

    const closeModal = () => {        
        modalRef.current.style.display = 'none'
    }

    const openLoginModal = () => {
        let loginModal = document.getElementById("user-login-modal")

        if (loginModal) {            
            loginModal.style.display = "block";    
        }
        modalRef.current.style.display = 'none'
    }

    return (
        <div id="user-register-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            <div className="modal-content p-5 rounded-xl shadow-md ">
                
                <div>                    
                    <div className="flex justify-between items-center mb-5">
                        <h1 className='text-xl font-bold'>Sign up</h1>
                        <i onClick={() => closeModal()} className='bx bx-x text-gray-500 text-3xl hover:text-black cursor-pointer'></i>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="register_name" className='text-xs'>Name</label>
                        <input type="text" name='register_name' onChange={(e) => setName(e.target.value)} disabled={loading} ref={nameRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className='text-xs'>Email</label>
                        <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} disabled={loading} ref={emailRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="public_address" className='text-xs'>Public Address</label>
                        <input type="text" name='public_address' onChange={(e) => setPublicAddress(e.target.value)} disabled={loading} ref={publicAddressRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="register_password" className='text-xs'>Password</label>
                        <input type="password" name='register_password' disabled={loading} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <p onClick={openLoginModal} className="text-xs cursor-pointer my-4 text-center hover:underline">
                        Already have an account?
                    </p>
                    <Button 
                    disabled={loading}
                    onClick={submitData}               
                    className="mb-1  w-full text-sm text-white flex items-center justify-center">
                        { loading ? <i className='bx bx-loader text-lg bx-spin bx-rotate-90' ></i> : 'Proceed' }
                        
                    </Button>
                </div>

            </div>
        </div>
    )
}