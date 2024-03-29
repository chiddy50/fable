import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import toast from 'react-hot-toast';

export const createStoryTransaction = async (payload: any, status: string, token: string) => {
    try {
        
        const response = await axiosInterceptorInstance.post("/story/transaction/create", 
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


export const updateStory = async (payload: any, storyId: string, token: string) => {
    try {                
        const response = await axiosInterceptorInstance.put(`/stories/id/${storyId}`, 
            {
                award: payload.position,
                challengeId: payload.challengeId,           
                nftId: payload.nftId,                 
                nftTransactionId: payload.nftTransactionId,      
                projectId: payload.projectId,             
                amountPaid: payload.amountPaid,            
                amountPending: payload.amountPending,         
                paidAt: payload.paidAt,                
                awardedAt: payload.awardedAt,             
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
        toast({
            title: "Unable to update story",
            description: "Unable to update story",
            variant
        })
        return false
    }
}