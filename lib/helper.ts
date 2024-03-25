import axios from "axios";
import { formatDistanceToNow } from "date-fns";


export const showTransferLoader = () => {
    let fullPageLoader = document.getElementById("full-page-loader") as HTMLElement
    if (fullPageLoader) {            
        fullPageLoader.style.display = "block";    
    }
}

export const hideTransferLoader = () => {
    let fullPageLoader = document.getElementById("full-page-loader") as HTMLElement
    if (fullPageLoader) {            
        fullPageLoader.style.display = "none";    
    }
}

export const bringUpAdminLoginModal = () => {
    let adminLoginModal = document.getElementById("admin-login-modal") as HTMLElement
    if (adminLoginModal) {            
        adminLoginModal.style.display = "block";    
    }
}

export const bringUpUserLoginModal = () => {
    let adminLoginModal = document.getElementById("user-login-modal") as HTMLElement
    if (adminLoginModal) {            
        adminLoginModal.style.display = "block";    
    }
}

export const openAwardModal = () => {
    let awardModal = document.getElementById("award-modal") as HTMLElement
    if (awardModal) {            
        awardModal.style.display = "block";    
    }
}

export const formatDate = (targetDate: string) => {
    let format = formatDistanceToNow(new Date(targetDate), { addSuffix: true })
    return format ?? '';        
}

export const openPreviewModal = ()  => {
    const modal = document.getElementById('challenge-preview-component-modal') as HTMLElement;
    modal.style.display = 'block';
}

const uploadImage = async (file = null) => {
    const preset_key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            
    const image = file;
    
    try{
        if (image && preset_key && cloudName) {
            const formData = new FormData();
            formData.append("file", image)
            formData.append("upload_preset", preset_key)
            
            axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
                formData                
            )
            .then(res => {
                console.log("Image: ",res.data.url);                

            })
            .catch(err => console.log(err))   
    
        };
    } catch(error){
        console.log(error)            
    }
    finally{

    }
}

