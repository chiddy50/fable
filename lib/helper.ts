export const showTransferLoader = () => {
    let fullPageLoader = document.getElementById("full-page-loader")
    if (fullPageLoader) {            
        fullPageLoader.style.display = "block";    
    }
}

export const hideTransferLoader = () => {
    let fullPageLoader = document.getElementById("full-page-loader")
    if (fullPageLoader) {            
        fullPageLoader.style.display = "none";    
    }
}

export const bringUpAdminLoginModal = () => {
    let adminLoginModal = document.getElementById("admin-login-modal")
    if (adminLoginModal) {            
        adminLoginModal.style.display = "block";    
    }
}

export const bringUpUserLoginModal = () => {
    let adminLoginModal = document.getElementById("user-login-modal")
    if (adminLoginModal) {            
        adminLoginModal.style.display = "block";    
    }
}

export const openAwardModal = () => {
    let awardModal = document.getElementById("award-modal")
    if (awardModal) {            
        awardModal.style.display = "block";    
    }
}