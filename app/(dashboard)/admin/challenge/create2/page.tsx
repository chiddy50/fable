"use client"

import { transferToUsers } from "@/lib/transferToUsers"

const TestComponent = ()  => {

    const testing = async () => {
        const test = await transferToUsers('8boxjTdZEckTQEzBDCGfJF5mRWP4xYeMuizCfFoWSyP6', 1)
        console.log(test);
        
    }

    const openDatetimePicker = async (e) =>  {
        try {
            await e.target.showPicker();
        } catch (error) {
            console.log(error);                
        }
    }
    return  (
        <div className=" h-screen bg-[#151515]">
            <div className=" "></div>

            <div className=" w-11/12 flex justify-center items-center mx-auto pt-5">
                <div className=" bg-gray-800 w-[400px] h-[280px] rounded-lg overflow-hidden">
                    <img id='preview'
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACUCAMAAADLemePAAAAMFBMVEXx8/XCy9L09ve/yNDGztXN1Nrs7/HT2d/o6+7Z3uPh5enJ0dfk6Ovc4eXQ19zV299BB7LwAAAEOElEQVR4nO2a2baDIAwAkU0Utf//t9e17gUCgtyTea7LNBgSgBT/GpL6BZ4F9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9eLDgt3pXXq84KKsqupTdpqHuOF79BgXn0YRukBUW2rO/CL5Fj3Gq0GNbKFUqkp4Cb5Dj+lakr3bbEikKj0E36DHivZKbVWswLdOr9cPy8vA7QU1LILJ9ZhQBrlRUFYcIphaj1XSwm4U/AD8Uus1dnKjoHIPYFI9pi1Dtwg6j9CUeky42Q0BFG5+CfVYJ93kBj/i9gUm1Cud5UZql4o7nV7pODC/AZQOAzSVHgPGjowD1PoxifRYB7YbaG2fk0hPeNkR2lg+x1ePQcp5xv3shg/Qrtv10us70LLshPviget8d+VnlWA89Jhuxw5UNqXjlQ6V2D2ys3gSXI99vx9KbD+FiZ/dnQOdOX5gPbadt6jLbapAdoSWRj+oHtvnPqqAF/r5GSs0cPSaw6PM/+RkFyCtbDD5QfVOMbANX5C0Yu0H1TulB7tEzdqgcsbvD6jHjmPTPE5G/Goxdz+o3qlVo5WFHrdZNnLl1/wH1VMQPRb4w5sR4fXOg9OcOhm0xTOhQ+sVn1NquX/Ggn5Grud2hQmqd3pVi7rsHPFQ3C4Rgqf1+hA+cwFYPWbX9383/RFYT+9yJ22Nds8NzR/Ph5fUfONHa3NecV/1C+Dn0RDxZt7ZodI8KbBQXdCt32VZ4dWtd+0w/SmL3amQfcIdV1+/32JEwXusfnoqA8IjL/7lSCtlTw/NAarO/3QcvQhDc/BrTuGLo/dEJX3ld0qfMfRYsNUVI8fC91ovyImgLzqa3amp3umxQnftdDCoz/f1R/Agx7siZM2FY3rZ6LGiq+XmYNBw7qkuQQcSdjxYa1747eunVW+tQra/JrL2PNf1aK154bf7/FY9cXt4pgGemRm5aHwfZvu2ix479acbqAJsk8z3jZc1F7abR4ueqayoHY8kLHaRh+b0ric94/IjlU5b9l8iZs2Vdcdq1LMbQdJiR+YYvKhZc+U7PAc9216MuuaYGG3QJXJ5TzJs49t+/VQ6blRGqjXPL7oUn2Q4+uRwYf3bZx+843JTRObZjxTcaRHE4VgeE+nsyFycEecdKYs90YkUc8L6llPvR35N5zdXtlYNBU8yJ6xvOS4tga5UNhk09E6eM8NLAi811jCPbZdYM273Q681bVZGbGFv6WcH6KX096k1/eyatCUCrDfsWtwHMHFamemHp8fV6r7GfmYX1hnqVfJeLQuPaSVVLRYWer2px18SuwBcJFD9P2I3cdz6gpzefzP7Jv7xbbzYUCmKaaWQFbwMeh7uFVBSf4TmXIvqP311K5RIqZSS9F/aIQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICn4A49MS2/QrYSCAAAAAElFTkSuQmCC'
                        className='w-full h-full object-cover object-center'                     
                        alt="Picture of the image"
                    />
                </div>
                {/* <div className=" matrix_box flex flex-col justify-items-center tracking-widest text-gray-400 space-y-3">
                    <p className=" text-xs font-bold">TEMPLATE</p>
                    <div className=" scroller flex-auto space-y-5 overflow-auto max-h-72 w-24">
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">2</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">3</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">4</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">5</button>
                        <button className=" w-20 h-20 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">6</button>
                        
                    </div>
                </div> */}

            </div>

            <div className=" fixed bottom-0 pb-4 inset-x-0 bg-gray-800 border border-gray-600 space-y-3 mx-auto rounded-t-xl w-11/12 pt-2">
            
                <div className=" flex items-end w-11/12 mx-auto">
                    <div className="flex items-center w-5/12 justify-between mx-auto">
                    
                        <label htmlFor="uploader">
                            <div className="cursor-pointer flex items-center">
                                <div className=" bg-gray-300 w-10 h-10 rounded-l flex justify-center items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M246.309-148.001q-41.308 0-69.808-28.5-28.5-28.5-28.5-69.808v-65.461q0-17.769 12.616-30.384 12.615-12.615 30.384-12.615t30.384 12.615Q234-329.539 234-311.77v65.461q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h467.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-65.461q0-17.769 12.615-30.384 12.615-12.615 30.384-12.615t30.384 12.615q12.616 12.615 12.616 30.384v65.461q0 41.308-28.5 69.808-28.5 28.5-69.808 28.5H246.309Zm189.692-499.462-76.923 76.923q-12.923 12.923-30.192 13.308-17.269.384-30.577-12.923-13.692-13.308-13.499-30.576.192-17.269 13.499-30.577l146.384-146.383q7.615-7.615 15.846-10.923 8.23-3.308 18.461-3.308 10.231 0 18.461 3.308 8.231 3.308 15.846 10.923l146.384 146.383q12.923 12.923 13.307 29.884.385 16.961-13.307 30.269-13.308 13.307-30.384 13.115-17.077-.192-30.385-13.5l-76.923-75.923v282.002q0 17.768-12.615 30.384-12.615 12.615-30.384 12.615t-30.384-12.615q-12.615-12.616-12.615-30.384v-282.002Z"/></svg>
                                </div>
                                <p className="text-xs uppercase w-max pl-3 pr-4 h-10 flex items-center justify-center bg-gray-200 rounded-r ">upload</p>

                            </div>
                        </label>
                        <input type="file" className="hidden" id="uploader" name="uploader" />
                    </div>
                
                    <div className=" w-7/12 mx-auto mt-4">
                        <input type="text" placeholder="Title" className=" bg-gray-600 text-gray-100 outline-none w-full h-10 px-4 rounded "  />
                    </div>
                </div>

                <div className=" flex w-11/12 mx-auto">
                    <textarea name="" placeholder=" Describe your challenge..." id="" cols={30} rows={2} className=" bg-gray-600 text-gray-100 outline-none w-full rounded-md p-2"></textarea>
                </div>

                <div className="grid w-11/12 mx-auto gap-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
                    <div className="flex col-span-1 gap-2 items-center">
                        <div className="w-[22%] h-10 bg-gray-600 flex items-center justify-center rounded px-1">
                            <select name="" id="" className=" bg-gray-600 text-gray-100 outline-none h-8 w-11/12 text-xs uppercase tracking-widest font-medium">
                                <option disabled value="">Currency</option>
                                <option value="">USD</option>
                                <option value="">Naira</option>
                                
                            </select>
                        </div>

                        <div className="w-[78%]">
                            <input type="number" placeholder="Price" className=" bg-gray-600 text-gray-100 outline-none w-full h-10 px-4 rounded "  />                   
                        </div>

                    </div>

                    <div className=" col-span-1">
                        <input type="datetime-local" id="datetimeInput" onClick={openDatetimePicker} placeholder="dd/mm/aaaa hh:mm" className=" bg-gray-600 text-gray-100 cursor-pointer outline-none w-full h-10 px-4 rounded "  />                   
                    </div>

                </div>           

                <div className=" w-11/12 flex mx-auto mb-5">
                    <button onClick={testing} className=" bg-gray-300 rounded w-full p-3 uppercase text-sm font-bold tracking-widest">create</button>
                </div>

            </div>

        </div>
    )
}

export default TestComponent