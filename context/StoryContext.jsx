"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { questions } from '@/lib/questions';
import { getCookie } from 'cookies-next';

export const AppContext = createContext();

export function StoryContext({ children, user }) {
    let token = getCookie('token');

    const [allQuestions, setAllQuestions] = useState([]);
    const [inPreview, setInPreview] = useState(false)
    const [challengeTitle, setChallengeTitle] = useState("")
    const [challengeDescription, setChallengeDescription] = useState("")
    const [challengeDate, setChallengeDate] = useState("")    
    const [challengeTime, setChallengeTime] = useState("")
    const [challengePrice, setChallengePrice] = useState("")
    const [challengeCurrency, setChallengeCurrency] = useState("")
    const [challengeCurrencySymbol, setChallengeCurrencySymbol] = useState("")
    const [challengeImage, setChallengeImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [loginRedirectPage, setLoginRedirectPage] = useState(null)
    const [story, setStory] = useState(questions)
    const [userLoggedIn, setUserLoggedIn] = useState(user)
    const [authUserData, setAuthUserData] = useState(user)
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    
    console.log({user});
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         setInPreview(true)
    //         reader.onload = (e) => {
    //             document.getElementById('display').src = e.target.result;
    //             document.getElementById('preview').src = e.target.result;
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }

    useEffect(() => {
        if (localStorage) {
            let user_auth_data = localStorage.getItem("user") ?? null;
            if (user_auth_data) {                
                setAuthUserData(user_auth_data)
            }
        }

        if (token) {
            setUserLoggedIn(true)
        }
    }, [])

    return (
        <AppContext.Provider value={{ 
            // questions: allQuestions,
            inPreview, setInPreview,
            challengeDate, setChallengeDate,
            challengeTitle, setChallengeTitle,
            challengeDescription, setChallengeDescription,
            challengeTime, setChallengeTime,
            challengePrice, setChallengePrice,
            challengeCurrency, setChallengeCurrency,
            challengeImage, setChallengeImage,
            loading, setLoading,
            uploading, setUploading,
            uploaded, setUploaded,
            uploadedImage, setUploadedImage,
            loginRedirectPage, setLoginRedirectPage,
            challengeCurrencySymbol, setChallengeCurrencySymbol,
            story, setStory,
            userLoggedIn, setUserLoggedIn,
            user,
            authUserData, setAuthUserData,
            selectedChallenge, setSelectedChallenge,
        }}>
            {children}
        </AppContext.Provider>
    );
}