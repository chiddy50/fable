"use client"

import { useContext, useRef, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { FormError } from "../from-error";
import { FormSuccess } from "../from-success";
import axios from "axios";
import { AppContext } from "@/context/StoryContext";

export default function AdminLoginModal(){
    const { push } = useRouter();
    const [isPending, startTransition] = useTransition()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    
    const detailsRef = useRef(null);
    const congratsRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const modalRef = useRef(null);
    const { setUserLoggedIn, authUserData, setAuthUserData } = useContext(AppContext)

    const submitData = async () => {
        try {            
            if (!validateCredentials()) {
                return;    
            }
    
            const payload = {
                email: adminEmail,
                password: adminPassword,
            }
    
            setLoading(true)

            const response = await axios.post("/api/auth/admin/login", payload)
            console.log(response);
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

    const openRegisterModal = () => {
        let adminLoginModal = document.getElementById("admin-login-modal")
        let adminRegisterModal = document.getElementById("admin-register-modal")

        if (adminLoginModal) {            
            adminLoginModal.style.display = "none";    
        }
        if (adminRegisterModal) {            
            adminRegisterModal.style.display = "block";    
        }
    }

    return (
        <div id="admin-login-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            <div className="modal-content p-5 rounded-xl shadow-md ">

                
                    <div>                    
                        <div className="flex justify-between items-center mb-5">
                            <h1 className='text-xl font-bold'>Sign in</h1>
                            <i onClick={() => closeModal()} className='bx bx-x text-gray-500 text-3xl hover:text-black cursor-pointer'></i>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className='text-xs'>Email</label>
                            <input type="email" name='email' onChange={(e) => setAdminEmail(e.target.value)} disabled={isPending} id='email' ref={emailRef} 
                            className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className='text-xs'>Password</label>
                            <input type="password" name='password' disabled={isPending} onChange={(e) => setAdminPassword(e.target.value)} id='password' ref={passwordRef} 
                            className='outline-none border text-xs border-gray-400 rounded-lg px-3 py-2 w-full'/>
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <p onClick={openRegisterModal} className="text-xs cursor-pointer my-4 text-center hover:underline">
                            Don&apos;t have an account?
                        </p>
                        <Button 
                        disabled={loading}
                        onClick={submitData}               
                        className="mb-1 w-full text-sm text-white flex items-center justify-center">
                            { loading ? <i className='bx bx-loader text-lg bx-spin bx-rotate-90' ></i> : 'Submit' }                            
                        </Button>
                    </div>
                

                {/* <div ref={congratsRef} style={{ display: 'none' }}>
                    <div className="flex flex-col items-center justify-center mb-5 gap-3">
                        <i className='bx bx-badge-check text-blue-800' style={{ fontSize: `${9}rem` }}></i>                        

                        <h1 className="text-gray-800 text-2xl">Thank you for your efforts!</h1>
                    </div>

                </div> */}

            </div>
        </div>
    )
}