import React, { useState } from 'react';

const Contact = () => {

    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const sendContact = async () => {

        const API_URL = import.meta.env.VITE_BACKEND_URL;
        // const API_URL = "http://localhost:8080"

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                alert("Message sent successfully!");

                setContact({
                    name: "",
                    email: "",
                    message: ""
                });
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="w-full h-screen py-140 bg-black/90 flex items-center justify-center text-white flex-col gap-17">

            <div className="flex flex-col justify-center items-center gap-6 w-8/10 lg:w-6/10">
                <h1 className="text-4xl md:text-5xl font-bold">Get in touch.</h1>

                <p className="text-center w-8/10 mx-auto text-white/80">
                    I'm always open to discuss new projects, creative ideas or technical architectures.
                    Drop a message below and I'll get back to you shortly.
                </p>
            </div>

            <div className="flex flex-col bg-[#1A1C1C] p-8 md:p-15 w-9/10 lg:w-6/10 gap-7">

                <div className="flex gap-10 flex-col md:flex-row">

                    <div className="flex flex-col gap-2 flex-1">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name"
                            value={contact.name}
                            onChange={handleChange}
                            className="bg-[#2F3131] p-4 text-[#f3efef]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            value={contact.email}
                            onChange={handleChange}
                            className="bg-[#2F3131] p-4 text-[#f3efef]"
                        />
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <label>Message</label>

                    <textarea
                        name="message"
                        rows={7}
                        placeholder="Enter your message"
                        value={contact.message}
                        onChange={handleChange}
                        className="bg-[#2F3131] p-4 text-[#f3efef] resize-none"
                    />
                </div>

                <div>
                    <button
                        onClick={sendContact}
                        className="bg-white px-10 py-5 text-black text-[0.8em] font-bold"
                    >
                        Send Message
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Contact;