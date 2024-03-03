"use client"

const LoadingComponent = () => {

    
    return (
        <>
            <div className="bg-white p-3 rounded-2xl w-full">
               
                <div className='text-center text-green-500'>

                    <div className=''>
                        <i className='bx bx-check-circle' style={{ fontSize: `${5}rem` }}></i>
                        <p className='text-sm mb-3'>Successfully Uploaded</p>
                    </div>

                </div>

            </div>

        </>
    )
}

export default LoadingComponent;