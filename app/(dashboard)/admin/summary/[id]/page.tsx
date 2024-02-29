"use client"

import AwardModal from "@/components/challenge/award-modal";
import SubmissionSummary from "@/components/challenge/submission-summary";
import ScrollToTopBottom from "@/components/general/scroll-to-top-bottom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
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