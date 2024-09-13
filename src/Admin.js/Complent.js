import React, { useState, useEffect } from 'react';
import Navbarhori from './Navbarhori';

const Complent = () => {
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/feedback", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to fetch data");
            }

            const data = await res.json();
            setUserdata(data);
            console.log("Data fetched successfully", data);
        } catch (err) {
            console.error("Error fetching data:", err);
            // You can also notify the user about the error here
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className='container' style={{ fontFamily: "Poppins" }}>
                <div className='row ' style={{ width: "100%", marginTop: "-3.2rem" }}>
                    <div className='col-xl-2 col-lg-2 col-md-6 col-sm-12' style={{ marginLeft: "-2.2rem", marginTop: "-1.6rem" }}>
                        <Navbarhori />
                    </div>

                    <div className='col-xl-10 col-lg-10 col-md-6 col-sm-12'>
                        <br />
                        <div className='row mx-2' style={{ width: "100%" }}>
                            <br />
                            <div>
                                <h1>Feedback</h1>
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
                                                <th scope="col"><h5>Message</h5></th>
                                                <th scope="col"><h5>Date</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getuserdata.map((element, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td style={{ fontSize: "17px" }}>{element.name}</td>
                                                            <td style={{ fontSize: "17px" }}>{element.email}</td>
                                                            <td style={{ fontSize: "17px" }}>{element.phone}</td>
                                                            <td style={{ fontSize: "17px" }}>{element.message}</td>
                                                            <td style={{ fontSize: "17px" }}>{new Date(element.createdAt).toLocaleString()}</td> {/* Format the date */}
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Complent;
