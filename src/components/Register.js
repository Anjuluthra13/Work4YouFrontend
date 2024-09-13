import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adddata } from '../reducer/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from "../image/login.jpg"; // Import image

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();

    // Initialize state with form values
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "", // Add cpassword here
        city: "",
        state: "",
        address: ""
    });

    // Handle input changes
    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prevVal) => ({
            ...prevVal,
            [name]: value
        }));
    };

    // Error notification
    const notifyError = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
    });

    // Success notification
    const notifySuccess = () => toast.success("Successfully registered", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
    });

    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, phone, password, cpassword, city, state, address } = inpval;
    
        // Validate if all fields are filled
        if (!name || !email || !phone || !password || !cpassword || !city || !state || !address) {
            notifyError();
            return;
        }
    
        // Check if password and confirm password match
        if (password !== cpassword) {
            toast.error("Passwords do not match", {
                position: "top-center",
                autoClose: 1000,
            });
            return;
        }
    
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password, city, state, address })
            });
        
            // Check for valid JSON response
            const text = await res.text();
            console.log('Raw response:', text);  // Log the raw response text for debugging
        
            const data = JSON.parse(text);  // Try parsing the response manually
        
            if (res.status === 200) {
                notifySuccess();
                history.push("/login");
            } else {
                notifyError();
            }
        } catch (err) {
            console.error("Error during registration:", err);
            toast.error("An error occurred during registration", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    };

    return (
        <>
            <section className="contactus-section " style={{ marginTop: "5rem", marginBottom: "15rem" }}>
                <div className="container">
                    <div className="row card-5" style={{ margin: "0rem 2rem 0rem 2rem", padding: "2rem 2rem 2rem 2rem" }}>
                        <div className="col-md-6 col-lg-6">
                            <h1 style={{ fontWeight: "bold" }}>Sign Up</h1>
                            <br />
                            <form method='POST'>
                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-user icon"></i>
                                    <input className="input-field" type="text" placeholder="Username" name="name" id='name' autoComplete='off' value={inpval.name} onChange={setdata} />
                                </div>

                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-envelope icon"></i>
                                    <input className="input-field" type="text" placeholder="Email" name="email" id='email' autoComplete='off' value={inpval.email} onChange={setdata} />
                                </div>

                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-phone icon" style={{ fontSize: "24px" }}></i>
                                    <input className="input-field" type="phone" placeholder="Phone" name="phone" id='phone' autoComplete='off' value={inpval.phone} onChange={setdata} />
                                </div>
                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-key icon"></i>
                                    <input className="input-field" type="password" placeholder="Password" name="password" id='password' autoComplete='off' value={inpval.password} onChange={setdata} />
                                </div>
                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-lock icon" style={{ fontSize: "24px" }}></i>
                                    <input className="input-field" type="password" placeholder="Confirm Password" name="cpassword" id='cpassword' autoComplete='off' value={inpval.cpassword} onChange={setdata} />
                                </div>
                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fas fa-map-marker-alt icon" style={{ fontSize: "24px" }}></i>
                                    <input className="input-field" type="text" placeholder="State" name="state" id='state' autoComplete='off' value={inpval.state} onChange={setdata} />
                                </div>

                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fas fa-map-marker-alt icon" style={{ fontSize: "24px" }}></i>
                                    <input className="input-field" type="text" placeholder="City" name="city" id='city' autoComplete='off' value={inpval.city} onChange={setdata} />
                                </div>

                                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                                    <i className="fa fa-home icon" style={{ fontSize: "24px" }}></i>
                                    <input className="input-field" type="text" placeholder="Address" name="address" id='address' autoComplete='off' value={inpval.address} onChange={setdata} />
                                </div>

                                <button type="submit" className="btn btn-dark" id="signup" style={{ marginTop: "2rem" }} onClick={addinpdata}>Register</button>
                            </form>
                        </div>

                        <div className="col-md-6 col-lg-6" style={{ padding: "4rem" }}>
                            <center>
                                <img src={image} className="img-fluid mt-5" style={{ width: "400px" }} alt="Register illustration" />
                            </center>
                            <center>
                                <Link to="/login" style={{ textDecoration: "none" }}>I already have an account</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
