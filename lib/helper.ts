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

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling behavior
    });
}

export const now = () => {
    const date = new Date();
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export const getCurrentRate = async (currency: string) => {
    try {
        let formatCurrency = currency.toLowerCase();
        const currencyMap: { [key: string]: string } = {
            eur: 'eur',
            cny: 'cny',
            gbp: 'gbp',
            ngn: 'ngn',
            usd: 'usd'
        };
    
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${formatCurrency}`)            
        const rate = res.data.solana[currencyMap[formatCurrency]]; 
        return rate       
    } catch (error) {
        console.log(error);            
        return null;
    }
}

export const setTransactionNarration = (position: string) => {        
    if (position === "FIRST") {
        return "Reward for first place writing"
    }
    
    if (position === "SECOND") {
        return "Reward for second place writing"
    }

    if (position === "THIRD") {
        return "Reward for third place writing"
    }

    if (position === "RECOGNIZED") {
        return "Reward for a recognized writer"
    }
}

export const getAwardPercentage = (position: string) => {        
    if (position === 'FIRST') return 0.5;
    if (position === 'SECOND') return 0.3;
    if (position === 'THIRD') return 0.2;
}