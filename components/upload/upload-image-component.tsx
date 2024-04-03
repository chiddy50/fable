"use client"

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/StoryContext"
import axios from "axios"

const UploadImageComponent = () => {
    const { 
        challengeImage,
        setInPreview, setChallengeImage,
        uploading, setUploading,
        uploaded, setUploaded,
        uploadedImage, setUploadedImage,
        imagePlaceholder, setImagePlaceholder
    } = useContext(AppContext)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        console.log({file});
        
        if (!file) {
           return 
        }
        
        // let res = await uploadImage(file);

        if (file) {

            setChallengeImage(null)
            setChallengeImage(file)

            const reader = new FileReader();
            setInPreview(true)

            reader.onload = (e) => {

                let preview_box = document.getElementById('preview') as HTMLElement
                if (preview_box) {  
                    setUploadedImage(e?.target?.result)
                    setImagePlaceholder(e?.target?.result)
                    preview_box.src = e?.target?.result;
                }
            };
            reader.readAsDataURL(file);

            
        }
    }

    // const onUploadProgress = (progressEvent: any) => {
    //     const { loaded, total } = progressEvent;
        
    //     let percent = Math.floor((loaded * 100) / total);
    //     console.log(`${percent}%`);
    //     setUploading(true)
        
    //     const progressBar = document.getElementById("progress-bar")
    //     if (progressBar) {            
    //         progressBar.style.width = `${percent}%`;
    //         if (percent < 100) {
    //             progressBar.style.width = `${percent}%`;
        
    //             // console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
    //         }else{
    //             setUploading(false)
    //             setUploaded(true)
    //         }
    //     }

    // };


    // const uploadImage = async (file = null) => {
    //     const preset_key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY
    //     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                
    //     setUploading(true)

    //     const image = file ?? challengeImage;
        
    //     try{
    //         if (image && preset_key && cloudName) {
    //             const formData = new FormData();
    //             formData.append("file", image)
    //             formData.append("upload_preset", preset_key)
                
    //             console.log("uploading: ", uploading);
    //             axios.post(
    //                 `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
    //                 formData, 
    //                 {                    
    //                     onUploadProgress,
    //                 }
    //             )
    //             .then(res => {
    //                 console.log("Image: ",res.data.url);
    //                 setUploadedImage(res?.data?.secure_url)
    //                 setUploaded(true)
    //                 setUploading(false)

    //                 let preview_box = document.getElementById('preview')
    //                 if (preview_box) {                    
    //                     preview_box.src = res?.data?.secure_url;
    //                 }

    //             })
    //             .catch(err => console.log(err))   
        
    //         };
    //     } catch(error){
    //         console.log(error)            
    //     }
    //     finally{
    //         setUploading(false)
    //     }
    // }
    
    return (
        <>
            <div className="bg-[#232323] p-3 rounded-2xl w-full border-gray-400 border-dashed border-2">
                <label htmlFor="image">
                    <div className='text-center cursor-pointer text-blue-500'>

                        {   
                            !uploading && 
                            <div className='flex items-center gap-4 text-gray-200'>
                                <i className='bx bx-plus-circle'></i>
                                <p className='text-sm'>Click to add picture</p>
                            </div>
                        }

                        {   
                            uploading && 
                            <div className='flex items-center gap-4 text-gray-200'>
                                <i className='bx bx-loader bx-spin bx-rotate-270'></i>
                                <p className='text-xs text-gray-200'>Uploading...</p>
                            </div>
                        }

                    </div>
                </label>

                <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png, .svg" name="image" id="image" className="hidden"/>
            </div>
        </>
    )
}

export default UploadImageComponent;