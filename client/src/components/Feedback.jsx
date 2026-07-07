import React, { useState } from 'react'
import { useEffect } from 'react'

const Feedback = () => {

    const[feedback, setFeedback] = useState("");

    const submitFeedback = async()=>{

        const API_URL = import.meta.env.VITE_BACKEND_URL;
        // const API_URL = "http://localhost:8080";

        try{

            if (!feedback.trim()) {
                alert("Please enter feedback");
                return; 
            }
            
            const response = await fetch(
                `${API_URL}/feedback`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({message:feedback})
                }
            )

            if(response.ok){
            alert("Feedback submitted successfully!");
            setFeedback("");
            }
        }catch(e){
            console.error(e);
            alert("Failed to submit feedback");
        }
    }

    return (
        <div className='w-full h-screen flex justify-center 
    items-center bg-black/90 text-white flex-col '
        >
            <div className='w-9/10 lg:w-5/10 flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-10 py-15'>
                    <h1 className='text-center text-4xl font-bold'>Share Your Experience</h1>
                    <p className='text-center'
                    >How was your experience working with me or share any advice? Your feedback helps me improve.</p>
                </div>
                <div className='flex flex-col bg-[#1A1C1C] w-full py-10 px-6 md:px-10 gap-10'>
                    <h1
                    className='text-center text-4xl font-bold md:text-5xl'
                    >Feedback</h1>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="comment">Your comments</label>
                        <textarea id="comment" 
                            rows={3} 
                            value={feedback}
                            placeholder='What did you like? What could be better?'
                            className='bg-[#2F3131] p-5' 
                            onChange={(e)=>{setFeedback(e.target.value)}}
                        ></textarea>
                    </div>
                    <div>
                        <button className='bg-white text-[0.8em] text-black
                        font-bold w-full py-6 ' onClick={()=>submitFeedback()}
                        >Submit Feedback</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Feedback