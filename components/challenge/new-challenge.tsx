"use client"

import { transferToUsers } from "@/lib/transferToUsers"
import { useEffect, useState, useContext, ChangeEvent } from 'react';
import { AppContext } from "@/context/StoryContext"
import { Button } from '@/components/ui/button';
import UploadImageComponent from '@/components/upload/upload-image-component';
import SuccessfullyUploadComponent from '@/components/upload/success-component';
import ConfirmModalComponent from "@/components/general/confirm-modal-component";
import { useRouter } from 'next/navigation';

import { createUnderdogNft, createUnderdogProject, currencies, umi } from "@/lib/data"
import axios from 'axios';
import { useEmbeddedWallet, DynamicWidget, useDynamicContext, useUserUpdateRequest, getAuthToken, useSendBalance, useUserWallets } from '@dynamic-labs/sdk-react-core';

import { hideTransferLoader, getCurrentRate, openPreviewModal, showTransferLoader } from '@/lib/helper';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import SuccessModal from '../modal/success-modal';
import * as animationData from "@/public/animations/thumbs-up.json"
import toast, { Toaster } from 'react-hot-toast';

const NewChallenge = () => {
    
    // STATE
    const [currentRate, setCurrentRate] = useState<null|number>(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [transactionFee, setTransactionFee] = useState<null|number>(null);
    const [transactionFeeSol, setTransactionFeeSol] = useState<null|number>(null);
    const [totalCharge, setTotalCharge] = useState<null|number>(null);
    const [totalChargeSol, setTotalChargeSol] = useState<null|number>(null);

    const router = useRouter();    

    // EXTERNAL HOOKS 
    const { open } = useSendBalance()
    const { user, primaryWallet, setShowAuthFlow, sdkHasLoaded } = useDynamicContext()
    const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
    const userWallets = useUserWallets();
    const dynamicJwtToken = getAuthToken();

    useEffect(() => {
        console.log({userWallets, sdkHasLoaded, user, primaryWallet});
        // getCurrentRate("usd") 
        updateCurrentRate("usd")
    }, [])

    // CONTEXT
    const { 
        inPreview,        
        setInPreview,
        uploadedImage, setUploadedImage,
        imagePlaceholder, setImagePlaceholder,        
        setChallengeTitle, challengeTitle,
        setChallengeDescription, challengeDescription,
        challengeTime, setChallengeTime, 
        challengeDate, setChallengeDate, 
        challengePrice, setChallengePrice, 
        challengeCurrency, setChallengeCurrency,
        challengeImage, setChallengeImage,
        challengeCurrencySymbol, setChallengeCurrencySymbol

    } = useContext(AppContext)

    const updateCurrentRate = async (currency: string) => {
        let rate = await getCurrentRate(currency)
        setCurrentRate(rate);          
    }

    const openDatetimePicker = async (e) =>  {
        try {
            await e.target.showPicker();
        } catch (error) {
            console.log(error);                
        }
    }

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

    const updateCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {        
        let symbol = e.target.value;
        setChallengeCurrencySymbol(symbol)

        let selectedCurrency = currencies.find(currency => currency.symbol === symbol);

        if (selectedCurrency) {
            setChallengeCurrency(selectedCurrency.code)
            let rate = await getCurrentRate(selectedCurrency.code)
            setCurrentRate(rate);            
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
                toast('No wallet found')
                return
            }
            
            setOpenConfirmModal(true);
            
        } catch (error) {
            console.log(error);            
        }finally{
            hideTransferLoader()
        }
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

    const proceedAfterConfirmation = async () => {
        try {
            
            const validate = validateMetaData();
            if (!validate)  return;   

            let result: FeeCalculationResult | boolean = calculateFees();

            if (typeof result === 'boolean')  return;

            // Handle the case when calculateFees() returns false
            let { percentage, tenPercentFee, tenPercentFeeInSol, totalChargeInSol, totalChargePlusFeeInSol, totalCharge, totalChargePlusFee } = result;
                        
            const paymentAmount = Number(totalChargePlusFeeInSol) * LAMPORTS_PER_SOL; 
            console.log({ normal:totalChargePlusFeeInSol, sol:paymentAmount, rounded_sol: Math.floor(paymentAmount) });
            
            showTransferLoader()
            
            const tx: any = await debitWallet(Math.floor(paymentAmount))
            if (!tx) {  
                hideTransferLoader()
                toast('Could not complete the transaction')
                return
            }       

            // CREATE TRANSACTION
            let transaction = await createTransaction(result, tx, "SUCCESS")
            if (!transaction) {
                console.log("Could not create transaction record for challenge");                
            }

            let image = await uploadImage()            
            console.log({image});

            if (!image) {
                toast('Could not upload image')

                hideTransferLoader()

                return false;
            }            
    
            let projectId = "1";
            const payload = getCreateChallengePayload(image, projectId)
    
            // USE PROJECT TO CREATE NFT
            let publicKey = user?.verifiedCredentials[0].address
            const underdogNft = await createUnderdogNft(payload, projectId, publicKey)
            console.log(underdogNft);

            if (payload && 'type' in payload) {
                delete payload.type;
            }

            const nftPayload = {
                ...payload,
                transactionPublicId: tx,
                nftId: underdogNft ? underdogNft?.data?.nftId.toString() : null,
                nftTransactionId:  underdogNft ? underdogNft?.data?.transactionId : null
            }    

            let challengeCreated = await saveChallengeToDatabase(nftPayload, projectId)  
            console.log(challengeCreated);
            if (!challengeCreated?.challenge) {
                console.log("could not save to db");                
            }

            let successModal = document.getElementById("success-modal")
            
            successModal.style.display = "block"
            setTimeout(() => {
                successModal.style.display = "none"                
                router.push("/admin/challenges")
            }, 5000);
        } catch (error) {
            console.log(error);             
        }finally{
            hideTransferLoader()
        }
    }

    const createTransaction = async (result: FeeCalculationResult, transactionPublicId: string, status) => {
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
            status,
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

            toast('No Current rate')

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
            toast('Unable to create challenge')

            return false
        }
    }

    const validateMetaData = () => {
        if (!challengeTitle) {
            toast('Kindly provide a title')
            return false;
        }

        if (!uploadedImage) {
            toast('Kindly provide an image')
            return false;
        }

        if (!challengeDescription) {
            toast('Kindly provide a description')
            return false;
        }

        const validate_date = validateDateTime(challengeDate)
        if (validate_date.error) {
            toast(`${validate_date.message}`)

            return false;
        }

        if (challengePrice < 0) {
            toast('Invalid Price')

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

    return (
        <div className=" h-screen bg-[#1c1c1c]">
            <div className=" "></div>

            <div className=" w-11/12 flex justify-center items-center mx-auto pt-5">
                <div className=" bg-[#343434] w-[400px] h-[280px] rounded-lg overflow-hidden">
                    <img id='preview'
                        src={ imagePlaceholder ? imagePlaceholder : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACUCAMAAADLemePAAAAMFBMVEXx8/XCy9L09ve/yNDGztXN1Nrs7/HT2d/o6+7Z3uPh5enJ0dfk6Ovc4eXQ19zV299BB7LwAAAEOElEQVR4nO2a2baDIAwAkU0Utf//t9e17gUCgtyTea7LNBgSgBT/GpL6BZ4F9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9eLDgt3pXXq84KKsqupTdpqHuOF79BgXn0YRukBUW2rO/CL5Fj3Gq0GNbKFUqkp4Cb5Dj+lakr3bbEikKj0E36DHivZKbVWswLdOr9cPy8vA7QU1LILJ9ZhQBrlRUFYcIphaj1XSwm4U/AD8Uus1dnKjoHIPYFI9pi1Dtwg6j9CUeky42Q0BFG5+CfVYJ93kBj/i9gUm1Cud5UZql4o7nV7pODC/AZQOAzSVHgPGjowD1PoxifRYB7YbaG2fk0hPeNkR2lg+x1ePQcp5xv3shg/Qrtv10us70LLshPviget8d+VnlWA89Jhuxw5UNqXjlQ6V2D2ys3gSXI99vx9KbD+FiZ/dnQOdOX5gPbadt6jLbapAdoSWRj+oHtvnPqqAF/r5GSs0cPSaw6PM/+RkFyCtbDD5QfVOMbANX5C0Yu0H1TulB7tEzdqgcsbvD6jHjmPTPE5G/Goxdz+o3qlVo5WFHrdZNnLl1/wH1VMQPRb4w5sR4fXOg9OcOhm0xTOhQ+sVn1NquX/Ggn5Grud2hQmqd3pVi7rsHPFQ3C4Rgqf1+hA+cwFYPWbX9383/RFYT+9yJ22Nds8NzR/Ph5fUfONHa3NecV/1C+Dn0RDxZt7ZodI8KbBQXdCt32VZ4dWtd+0w/SmL3amQfcIdV1+/32JEwXusfnoqA8IjL/7lSCtlTw/NAarO/3QcvQhDc/BrTuGLo/dEJX3ld0qfMfRYsNUVI8fC91ovyImgLzqa3amp3umxQnftdDCoz/f1R/Agx7siZM2FY3rZ6LGiq+XmYNBw7qkuQQcSdjxYa1747eunVW+tQra/JrL2PNf1aK154bf7/FY9cXt4pgGemRm5aHwfZvu2ix479acbqAJsk8z3jZc1F7abR4ueqayoHY8kLHaRh+b0ric94/IjlU5b9l8iZs2Vdcdq1LMbQdJiR+YYvKhZc+U7PAc9216MuuaYGG3QJXJ5TzJs49t+/VQ6blRGqjXPL7oUn2Q4+uRwYf3bZx+843JTRObZjxTcaRHE4VgeE+nsyFycEecdKYs90YkUc8L6llPvR35N5zdXtlYNBU8yJ6xvOS4tga5UNhk09E6eM8NLAi811jCPbZdYM273Q681bVZGbGFv6WcH6KX096k1/eyatCUCrDfsWtwHMHFamemHp8fV6r7GfmYX1hnqVfJeLQuPaSVVLRYWer2px18SuwBcJFD9P2I3cdz6gpzefzP7Jv7xbbzYUCmKaaWQFbwMeh7uFVBSf4TmXIvqP311K5RIqZSS9F/aIQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICn4A49MS2/QrYSCAAAAAElFTkSuQmCC' }
                        className='w-full border border-[#343434] h-full object-cover object-center'                     
                        alt="Picture of the image"
                    />
                </div>
                {/* <div className=" matrix_box flex flex-col justify-items-center tracking-widest text-gray-400 space-y-3">
                    <p className=" text-xs font-bold">TEMPLATE</p>
                    <div className=" scroller flex-auto space-y-5 overflow-auto max-h-72 w-24">
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">2</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">3</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">4</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">5</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">6</button>
                        
                    </div>
                </div> */}

            </div>

            <div className=" fixed bottom-0 pb-4 inset-x-0 bg-[#2e2e2e] border border-[#343434] space-y-3 mx-auto rounded-t-xl w-11/12 pt-2">
            
                <div className=" flex items-end w-11/12 mx-auto">
                    <div className="flex items-center w-5/12 justify-between mx-auto">
                    
                        <label htmlFor="uploader">
                            <div className="cursor-pointer flex items-center">
                                <div className=" bg-gray-300 w-10 h-10 rounded-l flex justify-center items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M246.309-148.001q-41.308 0-69.808-28.5-28.5-28.5-28.5-69.808v-65.461q0-17.769 12.616-30.384 12.615-12.615 30.384-12.615t30.384 12.615Q234-329.539 234-311.77v65.461q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h467.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-65.461q0-17.769 12.615-30.384 12.615-12.615 30.384-12.615t30.384 12.615q12.616 12.615 12.616 30.384v65.461q0 41.308-28.5 69.808-28.5 28.5-69.808 28.5H246.309Zm189.692-499.462-76.923 76.923q-12.923 12.923-30.192 13.308-17.269.384-30.577-12.923-13.692-13.308-13.499-30.576.192-17.269 13.499-30.577l146.384-146.383q7.615-7.615 15.846-10.923 8.23-3.308 18.461-3.308 10.231 0 18.461 3.308 8.231 3.308 15.846 10.923l146.384 146.383q12.923 12.923 13.307 29.884.385 16.961-13.307 30.269-13.308 13.307-30.384 13.115-17.077-.192-30.385-13.5l-76.923-75.923v282.002q0 17.768-12.615 30.384-12.615 12.615-30.384 12.615t-30.384-12.615q-12.615-12.616-12.615-30.384v-282.002Z"/></svg>
                                </div>
                                <p className="text-xs uppercase w-max pl-3 pr-4 h-10 flex items-center justify-center bg-gray-200 rounded-r ">upload</p>

                            </div>
                        </label>
                        <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" name="uploader" id="uploader" className="hidden"/>

                    </div>
                
                    <div className=" w-7/12 mx-auto mt-4">
                        <input type="text" placeholder="Title" onChange={updateTitle} value={challengeTitle} className=" bg-[#212121] border-[#343434] border text-gray-100 outline-none w-full h-10 px-4 rounded "  />
                    </div>
                </div>

                <div className=" flex w-11/12 mx-auto">
                    <textarea name="" onChange={updateDescription} value={challengeDescription} placeholder=" Describe your challenge..." id="" cols={30} rows={2} className=" bg-[#212121] border-[#343434] border text-gray-100 outline-none w-full rounded-md p-2"></textarea>
                </div>

                <div className="grid w-11/12 mx-auto gap-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                    <div className="flex col-span-1 gap-2 items-center">
                        <div className="w-[22%] h-10 bg-[#212121] border-[#343434] border flex items-center justify-center rounded px-1">
                            <select onChange={updateCurrency} defaultValue={currencies.length > 0 ? currencies[0].symbol : ""} className=" bg-[#212121] text-gray-100 outline-none h-8 w-11/12 text-xs uppercase tracking-widest font-medium">
                                <option disabled value="">Currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.symbol}>
                                        {currency.code} - {currency.symbol}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-[78%]">
                            <input type="number" value={challengePrice} onChange={(e: ChangeEvent<HTMLInputElement>) => setChallengePrice(e.target.value)} placeholder="Price" className=" bg-[#212121] border-[#343434] border text-gray-100 outline-none w-full h-10 px-4 rounded "  />                   
                        </div>

                    </div>

                    <div className=" col-span-1">
                        <input type="datetime-local" onChange={updateDate} value={challengeDate} id="datetimeInput" onClick={openDatetimePicker} placeholder="dd/mm/aaaa hh:mm" className=" bg-[#212121] border-[#343434] border text-gray-100 cursor-pointer outline-none w-full h-10 px-4 rounded "  />                   
                    </div>

                </div>           

                <div className=" w-11/12 flex mx-auto mb-5">
                    <button onClick={submitMetaData} className=" bg-[#222d28] border border-[#155a3c] text-[#85e0b7] rounded w-full p-3 uppercase text-sm font-bold tracking-widest">create</button>
                </div>

            </div>

            <ConfirmModalComponent 
            confirmProcess={proceedAfterConfirmation} 
            openConfirmModal={openConfirmModal} 
            setOpenConfirmModal={setOpenConfirmModal}
            title="Confirm Payment" 
            subtitle="Disclaimer: We would never share your credentials with anyone"
            buttonText="Pay"
            />

            <SuccessModal animation={animationData} title="Challenge created" />
            {/* <Toaster /> */}


        </div>
    )
}

export default NewChallenge