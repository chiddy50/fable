"use client";

import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from "@/context/StoryContext"

import { Button } from '@/components/ui/button';
import UploadImageComponent from '@/components/upload/upload-image-component';
import SuccessfullyUploadComponent from '@/components/upload/success-component';
import ConfirmModalComponent from "@/components/general/confirm-modal-component";

import { createUnderdogNft, createUnderdogProject, currencies, umi } from "@/lib/data"
import axios from 'axios';
import { useEmbeddedWallet, DynamicWidget, useDynamicContext, useUserUpdateRequest, getAuthToken, useSendBalance, useUserWallets } from '@dynamic-labs/sdk-react-core';

import { useToast } from "@/components/ui/use-toast"
import { hideTransferLoader, openPreviewModal, showTransferLoader } from '@/lib/helper';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import ChallengePreviewComponentModal from '../modal/challenge-preview-component-modal';

const NewChallenge = () => {
    
    // STATE
    const [currentRate, setCurrentRate] = useState<null|number>(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [transactionFee, setTransactionFee] = useState<null|number>(null);
    const [transactionFeeSol, setTransactionFeeSol] = useState<null|number>(null);
    const [totalCharge, setTotalCharge] = useState<null|number>(null);
    const [totalChargeSol, setTotalChargeSol] = useState<null|number>(null);

    const router = useRouter();    

    // CONTEXT
    const { 
        userLoggedIn, uploaded,
        setChallengeTitle, challengeTitle,
        setChallengeDescription, challengeDescription,
        challengeTime, setChallengeTime, 
        challengeDate, setChallengeDate, 
        challengePrice, setChallengePrice, 
        challengeCurrency, setChallengeCurrency, 
        uploadedImage, setUploadedImage, imagePlaceholder,
        challengeImage, setChallengeImage,
        challengeCurrencySymbol, setChallengeCurrencySymbol
    } = useContext(AppContext)

    // EXTERNAL HOOKS 
    const { open } = useSendBalance()
    const { user, primaryWallet, setShowAuthFlow, sdkHasLoaded } = useDynamicContext()
    const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
    const userWallets = useUserWallets();
    const { toast } = useToast()
    const dynamicJwtToken = getAuthToken();

    // END OF EXTERNAL HOOKS 

    useEffect(() => {
        console.log({userWallets, sdkHasLoaded, user, primaryWallet});
        getCurrentRate("usd")
    }, [])

    // FUNCTIONS

    const ensureWalletConnection = async () => {        
        if (!userHasEmbeddedWallet()) {
          try {
            const walletId = await createEmbeddedWallet();
            console.log("Embedded Wallet Created with ID:", walletId);
            // Wallet is created and by default, this should act as "reconnecting" the user to their new wallet
          } catch (e) {
            console.error("Error creating embedded wallet:", e);
          }
        } else {
          console.log("User already has an embedded wallet.");
          // Here, you might include logic to use the wallet or ensure it's "connected" based on your app's logic
        }
    };

    const updateDate = (e: ChangeEvent<HTMLInputElement>) => {        
        setChallengeDate(e.target.value)
        setChallengeTime(e.target.value)
    }

    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {        
        setChallengeTitle(e.target.value)
    }

    const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {        
        setChallengeDescription(e.target.value)
    }
    
    const updateTime = (e: ChangeEvent<HTMLInputElement>) => {
        setChallengeTime(e.target.value)
    }

    const updateCurrency = (e: ChangeEvent<HTMLSelectElement>) => {        
        let symbol = e.target.value;
        setChallengeCurrencySymbol(symbol)

        let selectedCurrency = currencies.find(currency => currency.symbol === symbol);

        if (selectedCurrency) {
            setChallengeCurrency(selectedCurrency.name)
            getCurrentRate(selectedCurrency.code)            
        }        
    }

    const getCurrentRate = (currency: string) => {
        let formatCurrency = currency.toLowerCase();
        const currencyMap: { [key: string]: string } = {
            eur: 'eur',
            cny: 'cny',
            gbp: 'gbp',
            ngn: 'ngn',
            usd: 'usd'
        };
    
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${formatCurrency}`)
            .then(res => {
                const rate = res.data.solana[currencyMap[formatCurrency]];
                setCurrentRate(rate);
            })
            .catch(err => console.log(err));  
    }

    const debitWallet = async (paymentAmount: number) => {
        const WalletAddress  = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS

        try {            
            if(WalletAddress === undefined){
                console.log("Undefined")
                return
            }

            let amount = BigInt(paymentAmount)
            console.log({amount});
            
            
            const tx = await open({
                recipientAddress: new PublicKey(WalletAddress).toBase58(),        
                value: amount,
            });
            console.log({tx});
            
            return tx;
        } catch (error) {
            console.log(error);
            return  null;            
        }
    }

    const submitMetaData = async () => {
        try {
            const validate = validateMetaData();
            if (!validate) {
               return; 
            }                
            
            if (!user) {
                setShowAuthFlow(true)
                return           
            }              
                        
            if (!primaryWallet) {                
                toast({
                    title: "No wallet found",
                    description: "No wallet connection found",
                })
                return
            }
            
            setOpenConfirmModal(true);
            
        } catch (error) {
            console.log(error);            
        }finally{
            hideTransferLoader()
        }
    }

    const proceedAfterConfirmation = async () => {
        try {
            // input send-balance-form__field
            
            const validate = validateMetaData();
            if (!validate) {
               return; 
            } 

            let result: FeeCalculationResult | boolean = calculateFees();

            if (typeof result === 'boolean') {                
                return;
            } 

            // Handle the case when calculateFees() returns false
            let { percentage, tenPercentFee, tenPercentFeeInSol, totalChargeInSol, totalChargePlusFeeInSol, totalCharge, totalChargePlusFee } = result;
                        
            const paymentAmount = Number(totalChargePlusFeeInSol) * LAMPORTS_PER_SOL; 
            console.log({ normal:totalChargePlusFeeInSol, sol:paymentAmount, rounded_sol: Math.floor(paymentAmount) });
            
            showTransferLoader()
            const tx: any = await debitWallet(Math.floor(paymentAmount))
            if (!tx) {  
                hideTransferLoader()
                toast({
                    title: "Transaction error",
                    description: "Could not complete the transaction",
                })
                return
            }           

            // CREATE TRANSACTION
            let transaction = await createTransaction(result, tx)
            if (!transaction) {
                console.log("Could not create transaction record for challenge");                
            }

            let image = await uploadImage()            
            console.log({image});

            if (!image) {
                toast({
                    title: "No Image",
                    description: "Could not upload image",
                })
                hideTransferLoader()

                return false;
            }
            
    
            let projectId = "1";
            const payload = getCreateChallengePayload(image, projectId)
    
            // USE PROJECT TO CREATE NFT
            let publicKey = user?.verifiedCredentials[0].address
            const underdogNft = await createUnderdogNft(payload, projectId, publicKey)
            console.log(underdogNft);
            
            if (!underdogNft) {
                toast({
                    title: "Could not create NFT challenge",
                    description: "Could not create NFT challenge",
                })
                hideTransferLoader()
                return;
            }
    
            if (payload && 'type' in payload) {
                delete payload.type;
            }

            const nftPayload = {
                ...payload,
                transactionPublicId: tx,
                nftId: underdogNft?.data?.nftId.toString(),
                nftTransactionId: underdogNft?.data?.transactionId
            }    

            let challengeCreated = await saveChallengeToDatabase(nftPayload, projectId)  
            console.log(challengeCreated);
            if (!challengeCreated?.challenge) {
                console.log("could not save to db");                
            }
    
            router.push("/admin/challenges")
        } catch (error) {
            console.log(error);
            
        }finally{
            hideTransferLoader()
        }
    }

    const createTransaction = async (result: FeeCalculationResult, transactionPublicId: string) => {
        let { percentage, tenPercentFee, tenPercentFeeInSol, totalChargeInSol, totalChargePlusFeeInSol, totalCharge, totalChargePlusFee } = result;
        
        let payload = {
            percentage: percentage.toString(),
            tenPercentFee: tenPercentFee.toString(),
            tenPercentFeeInSol: tenPercentFeeInSol.toString(),
            totalChargeInSol: totalChargeInSol.toString(),
            totalChargePlusFeeInSol: totalChargePlusFeeInSol.toString(),
            totalCharge: totalCharge.toString(),
            totalChargePlusFee: totalChargePlusFee.toString(),
            transactionPublicId: transactionPublicId,
            currency: challengeCurrency,
            symbol: challengeCurrencySymbol,
            status: "SUCCESS"
        }
        // let { percentage, tenPercentFee, tenPercentFeeInSol, totalChargeInSol, totalChargePlusFeeInSol, totalCharge, totalChargePlusFee } = result;

        try {
            let res = await axiosInterceptorInstance.post("/transactions/create", payload, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(res);
            return res?.data?.transaction
            
        } catch (error) {
            return null
            console.log(error);            
        }
    }

    const getCreateChallengePayload = (image: string,  projectId: string) => {
        const payload = {
            title: challengeTitle,
            description: challengeDescription,
            image: image,
            date: `${challengeDate}`,
            time: `${challengeTime}`,
            currency: challengeCurrency,
            symbol: challengeCurrencySymbol,
            price: challengePrice,
            projectId: projectId,
            type: "challenge",
            // projectTransactionId: underdogProject?.data.transactionId,
            // projectMintAddress: underdogProject?.data.mintAddress,
        }
        return payload
    }

    const calculateFees = () => {
        if (!currentRate) {
            toast({
                title: "No current rate",
                description: "No Current rate",
            })
            return false;
        }

        // Calculate fee
        let percentage = 0.10; // 10% in decimal form
        let tenPercentFee = Number(challengePrice) * percentage; // save this as transaction_fee
        let tenPercentFeeInSol = tenPercentFee / currentRate; // save this as transaction fee in SOL
        
        let totalCharge = Number(challengePrice);
        let totalChargePlusFee = Number(challengePrice) + tenPercentFee;

        let totalChargeInSol = Number(challengePrice) / currentRate; // total charge in sol
        let totalChargePlusFeeInSol = totalChargeInSol + tenPercentFeeInSol // total charge plus fees in sol

        setTransactionFee(tenPercentFee)
        setTransactionFeeSol(tenPercentFeeInSol)
        setTotalCharge(totalChargeInSol)
        setTotalChargeSol(totalChargePlusFeeInSol)
        
        console.log({
            challengePrice,
            percentage,
            tenPercentFee,
            tenPercentFeeInSol,
            totalChargeInSol,
            totalChargePlusFeeInSol,
            totalCharge,
            totalChargePlusFee,
        });

        return { percentage, tenPercentFee, tenPercentFeeInSol, totalChargeInSol, totalChargePlusFeeInSol, totalCharge, totalChargePlusFee }
    }

    const saveChallengeToDatabase = async (payload: object, projectId: string) => {
        try {

            console.log(payload);
             
            const response = await axiosInterceptorInstance.post(`/challenges/create`, payload, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(response);
            
            // resetForm()
            return response;
        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to create challenge",
                description: "Unable to create challenge",
            })
            return false
        }
    }

    const generateEmbeddedWallet = async () => {
        try {
            const walletId = await createEmbeddedWallet();
            // Once the wallet is created, ensure it's set as the primary wallet for further operations
            console.log("Embedded Wallet Created with ID:", walletId);
            return walletId;
        } catch(e) {
            console.error("Error creating embedded wallet:", e);
            return null;
        }
    }

    const validateMetaData = () => {
        if (!challengeTitle) {
            toast({
                title: "No Title",
                description: "Kindly provide a title",
            })
            return false;
        }

        if (!challengeDescription) {
            toast({
                title: "No Description",
                description: "Kindly provide a description",
            })
            return false;
        }

        const validate_date = validateDateTime(challengeDate)
        if (validate_date.error) {
            toast({
                title: "Invalid Date",
                description: validate_date.message,
            })
            return false;
        }

        if (challengePrice < 0) {
            toast({
                title: "Invalid Price",
                description: "Invalid Price",
            })
            return false;
        }

        return true;
    }

    const validateDateTime = (dateTimeString: string) => {
        const currentDateTime = new Date();
        const inputDateTime = new Date(dateTimeString);
    
        if (isNaN(inputDateTime.getTime())) {
            return { error: true, message: "Invalid date or time format" };
        }
    
        if (inputDateTime < currentDateTime) {
            return { error: true, message: "Date and time cannot be in the past" };
        }
    
        return { error: false, message: "Date and time are valid" };
    }

    const uploadImage = async () => {
        const preset_key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                        
        try{
            if (imagePlaceholder && preset_key && cloudName) {
                const formData = new FormData();
                formData.append("file", imagePlaceholder)
                formData.append("upload_preset", preset_key)
                
                let res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
                    formData, 
                    {                    
                        // onUploadProgress,
                    }
                )
                console.log("Image: ",res);
                setUploadedImage(res?.data?.secure_url) 
                return res?.data?.secure_url
            };
        } catch(error){
            console.log(error)            
        }
        finally{

        }
    }

    // FUNCTIONS END
    
    return (
        <div className="">
            <div className=' border border-gray-700 bg-gray-800 text-gray-200 rounded-xl p-5'>
                <div>
                    <div className="mb-3">
                        <label htmlFor="title" className='text-sm font-semibold '>Title</label>
                        <input type="text" onChange={updateTitle} value={challengeTitle} className='py-3 px-4 rounded-lg mt-1 w-full bg-[#3F4447] border border-none outline-none text-xs' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className='text-sm font-semibold '>Description</label>
                        <textarea onChange={updateDescription} value={challengeDescription} cols={2} rows={2} className='resize-none rounded-xl p-4 mt-1 w-full bg-[#3F4447] border-none outline-none text-xs'></textarea>
                    </div>

                    <div className="mb-4">
                        <p className='text-sm font-semibold mb-1'>Price</p>
                        <div className="flex items-center text-xs ">
                            {/* <select onChange={updateCurrency} className="py-3 px-4 border-none rounded-tl-xl rounded-bl-xl outline-none bg-[#3F4447]">
                                <option disabled value="">Currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.symbol}>
                                        {currency.name} - {currency.symbol}
                                    </option>
                                ))}
                            </select> */}
                            <select onChange={updateCurrency} defaultValue={currencies.length > 0 ? currencies[0].symbol : ""} className="py-3 px-4 border-none rounded-tl-xl rounded-bl-xl outline-none bg-[#3F4447]">
                                <option disabled value="">Currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.symbol}>
                                        {currency.name} - {currency.symbol}
                                    </option>
                                ))}
                            </select>
                            <input type="number" value={challengePrice} onChange={(e: ChangeEvent<HTMLInputElement>) => setChallengePrice(e.target.value)} placeholder='Price...' className='py-3 px-4 w-full rounded-tr-xl rounded-br-xl bg-[#3F4447] border-none outline-none' />
                        </div>
                    </div>
    
                    <div className="mb-7">
                        <p className='text-sm font-semibold  mb-1'>Duration</p>
                        <input onChange={updateDate} value={challengeDate} type="datetime-local" placeholder="dd/mm/aaaa hh:mm" className='w-full py-3 px-4 rounded-lg text-xs outline-none bg-[#3F4447]' data-input="data-input"/>
                    </div>

                </div>
                
                
                <div className="mb-5">
                    <div className='flex justify-center bg-[#3F4447] rounded-2xl'>                
                        { (!uploaded) && <UploadImageComponent />}
                        { (uploaded) && <SuccessfullyUploadComponent />}
                    </div>

                    {/* <div id="upload-progress-box" className="mb-2 h-1 rounded-lg">
                        <div id="progress-bar" className="h-full rounded-lg"></div>
                    </div>                                             */}
                </div>

                <div className="flex items-center justify-between">
                    
                    <Button onClick={submitMetaData} className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900">
                        Pay & Post
                    </Button>
                    
                    <Button onClick={openPreviewModal} className="flex items-center  justify-center gap-1 bg-[#2f3d47] text-white">
                        <i className='bx bxs-show'></i>
                        <span className="text-xs">Preview</span>
                    </Button>
                    
                </div>
            </div>



            {/* MODALS */}
            <ConfirmModalComponent 
            confirmProcess={proceedAfterConfirmation} 
            openConfirmModal={openConfirmModal} 
            setOpenConfirmModal={setOpenConfirmModal}
            title="Confirm Payment" 
            subtitle="Disclaimer: We would never share your credentials with anyone"
            buttonText="Pay"
            />
            <ChallengePreviewComponentModal />

        </div>
    )
}

export default NewChallenge