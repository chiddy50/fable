import axiosInterceptorInstance from "@/axiosInterceptorInstance";

export const createStoryTransaction = async (payload: any, status: string, token: string) => {
    try {
        
        const response = await axiosInterceptorInstance.post("/story/transaction", 
            {
                storyId: payload.storyId,                 
                challengeId: payload.challengeId,             
                transactionPublicId: payload.transactionPublicId,     
                totalInSol: payload.rewardInSol,              
                total: payload.reward,                   
                currency: payload.currency,                
                symbol: payload.symbol,                   
                narration: payload.narration,      
                status,          
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log(response);

        return response;
    } catch (error) {
        console.log(error)
        
        return false
    }
}