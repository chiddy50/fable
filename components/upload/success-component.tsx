"use client"

const SuccessfullyUploadComponent = () => {

    return (
        <>
            <div className="bg-white p-3 rounded-2xl w-full border-green-500 border-dashed border-2">
                <div className='flex items-center gap-4 text-green-500'>
                    <i className='bx bxs-check-circle'></i>
                    <p className='text-sm'>Successfully Uploaded</p>
                </div>
            </div>
        </>
    )
}

export default SuccessfullyUploadComponent;