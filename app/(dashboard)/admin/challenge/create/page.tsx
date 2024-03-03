import PreviewComponent from "@/components/upload/preview-component"
import UploadComponent from "@/components/upload/upload-component"
import UploadForm from "@/components/upload/upload-form"

const CreateChallengePage = async () => {
    // const session = await auth();

    return (
        <div className="h-full">

            <div className="h-full grid grid-cols-2 ">

                <div 
                // style={{ borderTopRightRadius: "2rem" }}
                className="p-7 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
                    <h1 className='text-4xl text-center text-white mb-7 font-semibold'>Create a Challenge</h1>
    
                    <UploadComponent />

                    <UploadForm />
                </div>

                <div className="p-7">                
                    <PreviewComponent />
                </div>
            </div>
        </div>
    )
}

export default CreateChallengePage