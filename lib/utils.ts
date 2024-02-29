import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const uploadImage = async (file:any) => {
  const preset_key = process.env.NEXT_PUBLIC_PRESET_KEY
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  try{
    if (file && preset_key && cloudName) {
      const uploadedImage = file;
      const formData = new FormData();
      formData.append("file", uploadedImage)
      formData.append("upload_preset", preset_key)

      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then(res => {
        console.log(res);
        
        // setImage(res?.data?.secure_url)
    })
      .catch(err => console.log(err))   

    };
  } catch(error){

  }
};