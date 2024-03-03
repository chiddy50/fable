import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { useState } from "react"
import { FormError } from "../from-error"

const AddAddressModal = ({ user, error, setUserAddress, confirmProcess, openConfirmModal, setOpenConfirmModal, title, subtitle, buttonText }) => {

    return (
        <AlertDialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
            {/* <AlertDialogTrigger className="w-full bg-black p-3 text-white rounded-xl">Create</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        {subtitle}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {
                    !user?.publicKey && <div>
                        <label htmlFor="address" className="text-xs">Address</label>
                        <Input type="text" name="address" className="mb-3" onChange={(e) => setUserAddress(e.target.value)}/>
                        <FormError message={error} />
                    </div>
                }

                <AlertDialogFooter>

                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    
                    <AlertDialogAction onClick={confirmProcess}>{buttonText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AddAddressModal