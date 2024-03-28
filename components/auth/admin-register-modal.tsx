"use client"

import { useContext, useRef, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/from-error";
import { FormSuccess } from "@/components/from-success";
// import { login } from "@/actions/login";
import axios from "axios";
import { AppContext } from "@/context/StoryContext";
import { setCookie } from 'cookies-next';

export default function AdminRegisterModal(){
    const { push } = useRouter();
    const [isPending, startTransition] = useTransition()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const { setUserLoggedIn, authUserData, setAuthUserData } = useContext(AppContext)
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const modalRef = useRef(null);



    const submitData = async () => {
        try {            
            if (!validateCredentials()) {
                return;    
            }
    
            const payload = {
                name: adminName,
                email: adminEmail,
                password: adminPassword,
            }

            let api_url = process.env.NEXT_PUBLIC_BASE_URL;
            
            setLoading(true)
    
            const response = await axios.post(`${api_url}/register`, payload)
            console.log(response);
            setCookie('token', response?.data?.token);

            setUserLoggedIn(true)
            closeModal()

            setAuthUserData(response)

            if (localStorage) {
                localStorage.setItem("user", JSON.stringify(response?.data?.data))
            }
         
        } catch (error) {
            console.log(error);
            let message = error?.response?.data?.message ?? "Something went wrong"
            setError(message)
        }finally{
            setLoading(false)
        }

    }



    const validateCredentials = () => {
        setError("")

        if (!adminName) {
            setError("Username is required")
            return false
        }

        if (!adminEmail) {
            setError("Email is required")
            return false
        }

        if (!adminPassword) {
            setError("Password is required")
            return false
        }
        return true
    }

    const closeModal = () => {        
        modalRef.current.style.display = 'none'
    }

    const openLoginModal = () => {
        let adminLoginModal = document.getElementById("admin-login-modal")

        if (adminLoginModal) {            
            adminLoginModal.style.display = "block";    
        }
        modalRef.current.style.display = 'none'
    }

    return (
        <div id="admin-register-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            <div className="modal-content bg-white p-5 rounded-xl shadow-md ">
                
                <div>                    
                    <div className="flex justify-between items-center mb-5">
                        <h1 className='text-xl font-bold'>Sign up</h1>
                        <i onClick={() => closeModal()} className='bx bx-x text-gray-500 text-3xl hover:text-black cursor-pointer'></i>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="register_name" className='text-xs'>Name</label>
                        <input type="text" name='register_name' onChange={(e) => setAdminName(e.target.value)} disabled={isPending} id='register_name' ref={nameRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="register_email" className='text-xs'>Email</label>
                        <input type="email" name='register_email' onChange={(e) => setAdminEmail(e.target.value)} disabled={isPending} id='register_email' ref={emailRef} 
                        className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="register_password" className='text-xs'>Password</label>
                        <input type="password" name='register_password' disabled={isPending} onChange={(e) => setAdminPassword(e.target.value)} id='register_password' ref={passwordRef} 
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
                    className="mb-1  w-full text-sm text-white bg-black flex items-center justify-center">
                        { loading ? <i className='bx bx-loader text-lg bx-spin bx-rotate-90' ></i> : 'Submit' }
                        
                    </Button>
                </div>

            </div>
        </div>
    )
}