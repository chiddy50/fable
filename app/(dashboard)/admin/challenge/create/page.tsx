import ChallengePreviewComponent from "@/components/challenge/challenge-preview-component"
import { Button } from "@/components/ui/button"
import PreviewComponent from "@/components/upload/preview-component"
import UploadComponent from "@/components/upload/upload-component"
import UploadForm from "@/components/upload/upload-form"

const CreateChallengePage = async () => {
    // const session = await auth();

    return (
        <div className="h-full layout-width">

            {/* <h1 className='text-4xl text-center text-white mb-7 mt-[8rem] font-semibold'>Create a Challenge</h1> */}
            <div className="h-full grid pt-10 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

                <div className="">
                    
                    <UploadComponent />

                    <UploadForm />
                </div>

                <div className="xs:hidden sm:hidden md:hidden lg:block">                
                    {/* <PreviewComponent /> */}
                    <div className="flex justify-center" >
                        <ChallengePreviewComponent/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateChallengePage