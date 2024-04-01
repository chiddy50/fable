import ChallengePreviewComponent from "@/components/challenge/challenge-preview-component"
import NewChallenge from "@/components/challenge/new-challenge3"
import { Button } from "@/components/ui/button"
import PreviewComponent from "@/components/upload/preview-component"
import UploadComponent from "@/components/upload/upload-component"
import UploadForm from "@/components/upload/upload-form"

const CreateChallengePage = async () => {
    // const session = await auth();

    return (
        <div className="h-full layout-width">
            

            <h1 className='text-2xl text-white mb-10 mt-[8rem] font-semibold'>Create a Challenge</h1>
            <div className="h-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">


                <div className="">
                    <NewChallenge />

                    {/* <UploadComponent />
                    <UploadForm /> */}

                </div>
                <div className="xs:hidden sm:block md:block lg:block">                
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