"use client"

import { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletButtonComponent = () => {
    const { primaryWallet, setShowDynamicUserProfile } = useDynamicContext()
    const copyTextRef = useRef(null);

    const truncateString = (inputString: string) => {
        if (inputString.length <= 8) {
            return inputString; // If the string is already 8 characters or less, return it unchanged
        } else {
            const truncatedString = inputString.slice(0, 4) + '...' + inputString.slice(-4);
            return truncatedString;
        }
    }

    const copyToClipboard = () => {
        let address:string = primaryWallet?.address ?? ''

        if (address) {            
            navigator.clipboard.writeText(address);
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 items-center w-0 p-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-4 w-4"
                          src="/images/solana-sol-logo.svg"                          
                          alt="Solana logo"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Wallet address copied!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ))
        }        
    };

    const bringUpDynamicUserProfile = () => setShowDynamicUserProfile(true)

    return (
        <>
            {
                primaryWallet &&     
                <div className="flex items-center bg-white py-2 px-3  gap-2 rounded-3xl">
                    <div onClick={copyToClipboard} className="border cursor-pointer flex items-center border-gray-700 rounded-full hover:bg-gray-700 hover:text-white hover:border-white pr-2">                        
                        <div className="h-6 w-6 rounded-full flex items-center justify-center ">
                            <i className='bx bx-copy text-xs'></i>
                        </div>
                        <p className="text-[9px]" ref={copyTextRef} id="primary-wallet-address">
                            {truncateString(primaryWallet.address)}
                        </p>
                    </div>
                    <div onClick={bringUpDynamicUserProfile} className="border cursor-pointer border-gray-700 h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white hover:border-white">
                        <i className="bx bx-user text-xs"></i>
                    </div>

                </div>
            }
        </>
    )
}

export default WalletButtonComponent