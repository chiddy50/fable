"use client"
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { StoryContext } from '@/context/StoryContext' 
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import { useRouter } from 'next/navigation';


const CustomContext = ({ children }) => {

    const { push } = useRouter()
    const createUser = async (payload: any) => {
      try {
        let res = await axiosInterceptorInstance.post("/create/user", payload)
        console.log(res);        
      } catch (error) {
        console.log(error);            
      }
    }

    return (
        <DynamicContextProvider 
          settings={{ 
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? "",
            walletConnectors: [ SolanaWalletConnectors ],
            eventsCallbacks: {
              onAuthSuccess: (args) => {
                console.log('onLinkSuccess was called', args);
                let { authToken, primaryWallet, user } = args

                // if (user.newUser) {
                  let payload = {
                    // token: authToken,
                    publicAddress: primaryWallet?.address,
                    email: user?.email,
                    username: user?.username,
                    id: user?.userId,
                  }

                  createUser(payload)
                // }
                // Call handleSignUpSuccess function here
                
              },
              onLogout(user) {
                  console.log(user);
                  // push("/")
              },
            }
          }}
        > 
            <StoryContext user={null}>
                {children}                
            </StoryContext>  

        </DynamicContextProvider>

    )
}

export default CustomContext