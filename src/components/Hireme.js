import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { CartState } from "../reducer/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hireme = () => {
    const formRef = useRef();
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        id: "",
        email: "",
        altEmail: "",
        phone: "",
        altPhone: "",
        amount: "",
        state: "",
        city: "",
        stime: "",
        date: "",
        etime: "",
        address: "",
        service: "",
    });
    

    const [total, setTotal] = useState();
    const [service, setService] = useState();
    const {
        state: { cart },
    } = CartState();

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
        setService(cart.reduce((acc, curr) => `${acc}${curr.service}:${curr.category},`, ""));
    }, [cart]);

    const callAboutPage = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/auth/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log("User data:", data);  // Log the response to check if _id is present
            setUserData(prev => ({
                ...prev,
                ...data,
                id: data.id // Ensure this is the correct field name
            }));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        callAboutPage();
    }, []);

    const postUserData = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };


    const convertDateTime = (date, time) => {
        return new Date(`${date}T${time}:00`);
    };

    const submitData = async (event) => {
        event.preventDefault();
    
        // Destructure user data
        const { name, phone, email, altEmail, amount, city, state, stime, etime, date, address, service } = userData;
    
        // Convert start and end times into ISO format using the provided date and time
        const startDateTime = convertDateTime(date, stime);
        const endDateTime = convertDateTime(date, etime);
        const currentDateTime = new Date();
    
        // Validate the form input
        if (!name || !email || !phone || !amount || !city || !state || !stime || !etime || !date || !address || !service) {
            toast.error("Please fill in all required fields", { autoClose: 1000 });
        } else if (startDateTime < currentDateTime || endDateTime < currentDateTime) {
            toast.error("Date and time should not be before the current date and time", { autoClose: 1000 });
        } else {
            // Show success toast for submission
            toast.success("Your booking has been submitted successfully", { autoClose: 1000 });
    
            // Send email notification (if needed)
            await sendEmail(event);
    
            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('token');
    
                // Send the hire request to the backend API
                const response = await fetch('http://localhost:8080/api/hire', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...userData, // Spread user data
                        startDateTime: startDateTime.toISOString(), // Send in ISO format
                        endDateTime: endDateTime.toISOString() // Send in ISO format
                    })
                });
    
                // Parse the response JSON
                const result = await response.json();
    
                // Check if the response is successful
                if (response.ok) {
                    // Log the hire request ID returned from MongoDB (_id)
                    console.log('Hire Request ID:', result._id);
    
                    // Show success toast with the hire request ID
                    toast.success(`Hire Request submitted.`);
                } else {
                    // Show error toast with a custom error message
                    toast.error(`Error: ${result.message || 'Failed to submit hire request'}`, { autoClose: 2000 });
                }
            } catch (error) {
                // Handle any errors that occurred during fetch
                console.error("Error submitting hire request:", error);
                toast.error("Failed to submit hire request. Please try again later.", { autoClose: 2000 });
            }
        }
    };
    
    // Function to send an email notification via EmailJS
    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            await emailjs.sendForm(
                'service_atgjewh', // Your EmailJS service ID
                'template_xxew3mt', // Your EmailJS template ID
                e.target, // The target form
                '5dNBwGLVf_4otvCwZ' // Your EmailJS user ID
            );
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
        const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <>
            <section className="contactus-section left">
                <div className="container" style={{ marginTop: "1rem" }}>
                    <div className="row">
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="row">
                                <div className="contact-rightside col-12 col-lg-12">
                                    <form method="POST" ref={formRef} onSubmit={submitData}>
                                        <div className="row">
                                            <div className="col-md-12" style={{ marginTop: "2rem", marginBottom: "3rem", color: "#121212" }}>
                                                <h3>BOOK NOW</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>FirstName</p>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control card-5"
                                                    placeholder=""
                                                    value={userData.name}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>User ID</p>
                                                <input
    type="text"
    name="id"
    className="form-control"
    placeholder=""
    value={userData.id || ""}
    onChange={postUserData}
    readOnly // Make the ID field read-only if it's not supposed to be changed manually
/>
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>City</p>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={[userData.state, userData.city]}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: "#121212", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Amount</p>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.amount = total}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Phone Number</p>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.phone}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Alt. Phone Number</p>
                                                <input
                                                    type="text"
                                                    name="altPhone"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.altPhone}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Email ID</p>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.email}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Alternative Email ID</p>
                                                <input
                                                    type="text"
                                                    name="altEmail"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.altEmail}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                        
                                        
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Address</p>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.address}
                                                    onChange={postUserData}
                                                />
                                            
                                        </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Starting Time</p>
                                                <input
                                                    type="time"
                                                    name="stime"
                                                    className="form-control card-5"
                                                    placeholder=""
                                                    value={userData.stime}
                                                    min={getCurrentDateTime().split('T')[1]} // Minimum time set to current time
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Ending Time</p>
                                                <input
                                                    type="time"
                                                    name="etime"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.etime}
                                                    min={userData.stime} // Minimum time set to start time
                                                    onChange={postUserData}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Date</p>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    id=""
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.date}
                                                    min={getCurrentDateTime().split('T')[0]} // Minimum date set to current date
                                                    onChange={postUserData}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-12 col-lg-12 contact-input-feild" style={{ marginTop: "-2.5rem", color: " ", fontWeight: "bold" }}>
                                                <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Service</p>
                                                <input
                                                    type="text"
                                                    name="service"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={userData.service = service}
                                                    onChange={postUserData}
                                                />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "1rem" }}>
                                            <div className="col-12 col-lg-12 contact-input-feild">
                                                <input
                                                    type="submit"
                                                    className="btn btn-style w-100"
                                                    value="Submit"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <ToastContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hireme;



    // Razorpay code commented out
    // function loadRazorpay(total) {
    //     const script = document.createElement('script');
    //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    //     script.onerror = () => {
    //         alert('Razorpay SDK failed to load. Are you online?');
    //     };
    //     script.onload = async () => {
    //         try {
    //             const result = await axios.post('/create-order', {
    //                 amount: total + '00',
    //             });
    //             const { amount, id: order_id, currency } = result.data;
    //             const {
    //                 data: { key: razorpayKey },
    //             } = await axios.get('/get-razorpay-key');

    //             const options = {
    //                 key: razorpayKey,
    //                 amount: total,
    //                 currency: currency,
    //                 name: 'example name',
    //                 description: 'example transaction',
    //                 order_id: order_id,
    //                 handler: async function (response) {
    //                     notifysuc();

    //                     const result = await axios.post('/order', {
    //                         amount: amount / 100,
    //                         id: userData._id,
    //                         razorpayPaymentId: response.razorpay_payment_id,
    //                         razorpayOrderId: response.razorpay_order_id,
    //                         razorpaySignature: response.razorpay_signature,
    //                     });
    //                     alert(result.data.msg);

    //                     history.push('./showorder');
    //                     window.location.reload();
    //                 },
    //                 prefill: {
    //                     name: 'example name',
    //                     email: 'email@example.com',
    //                     contact: '111111',
    //                 },
    //                 notes: {
    //                     address: 'example address',
    //                 },
    //                 theme: {
    //                     color: '#80c0f0',
    //                 },
    //             };

    //             const paymentObject = new window.Razorpay(options);
    //             paymentObject.open();
    //         } catch (err) {
    //             alert(err);
    //         }
    //     };
    //     document.body.appendChild(script);
    // }