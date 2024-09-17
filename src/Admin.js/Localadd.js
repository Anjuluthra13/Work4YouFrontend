import React from 'react';
import Navbarhori from './Navbarhori';
import { useState, useEffect } from 'react';

const Localadd = () => {
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async () => {
        try {
            const res = await fetch("https://work4youbackend-production.up.railway.app/api/contact", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            // Log the response status and check if it was successful
            console.log("Response Status:", res.status);
            console.log("Response Headers:", res.headers);
    
            // If the response is not OK (200), handle the error
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json(); // Attempt to parse JSON
            console.log("Response Data:", data);
    
            // Check if data is valid
            if (data && data.length > 0) {
                setUserdata(data);
                console.log("Data retrieved successfully");
            } else {
                console.log("No data found");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className='container' style={{ fontFamily: "Poppins" }}>
            <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                <div className='col-xl-2 col-lg-2 col-md-6 col-sm-12' style={{ marginLeft: "-2.2rem", marginTop: "-1.6rem" }}>
                    <Navbarhori />
                </div>

                <div className='col-xl-10 col-lg-10 col-md-6 col-sm-12'>
                    <br />
                    <div className='row mx-2' style={{ width: "100%" }}>
                        <br />
                        <div>
                            <h1>Contactus Query</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <hr />
                        <div className="card-5">
                            <div className="container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr className="table-active">
                                            <th scope="col mt-1"><h5>Id</h5></th>
                                            <th scope="col"><h5>Username</h5></th>
                                            <th scope="col"><h5>Email</h5></th>
                                            <th scope="col"><h5>Number</h5></th>
                                            <th scope="col"><h5>Subject</h5></th>
                                            <th scope="col"><h5>Message</h5></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getuserdata.length > 0 ? (
                                            getuserdata.map((element, index) => (
                                                <tr key={element.id}> {/* Use unique key */}
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{ fontSize: "17px" }}>{element.name}</td>
                                                    <td style={{ fontSize: "17px" }}>{element.email}</td>
                                                    <td style={{ fontSize: "17px" }}>{element.phone}</td>
                                                    <td style={{ fontSize: "17px" }}>{element.subject}</td>
                                                    <td style={{ fontSize: "17px" }}>{element.message}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>No feedback available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Localadd;
