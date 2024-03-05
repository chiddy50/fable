"use client"

import SubmissionSummary from "@/components/challenge/submission-summary";

import { AppContext } from "@/context/StoryContext"
import { openAwardModal } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
const SummaryPage = () => {

    const { push } = useRouter()
    const { story } = useContext(AppContext)

    const openAwardUserModal = () => {
        openAwardModal()
    }
        
    return (
        <SubmissionSummary />
        
    )
}

export default SummaryPage