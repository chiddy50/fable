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

const ConfirmModalComponent = ({ confirmProcess, openConfirmModal, setOpenConfirmModal, title, subtitle, buttonText }) => {
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
                <AlertDialogFooter className="flex flex-col">
                    <div>
                        <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
                    </div>
                    <div>
                        <AlertDialogAction className="w-full" onClick={confirmProcess}>{buttonText}</AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ConfirmModalComponent