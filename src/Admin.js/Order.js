import React, { useState, useEffect } from 'react';
import Navbarhori from './Navbarhori';
import { Button } from 'react-bootstrap';

const Order = () => {
    const [getuserdata, setUserdata] = useState([]);

    // Function to fetch order data
    const getdata = async () => {
        try {
            const res = await fetch("https://work4youbackend-production.up.railway.app/api/orders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!res.ok) {
                throw new Error("Error fetching order data.");
            }

            const data = await res.json();
            setUserdata(data);
            console.log("Data fetched successfully.", data);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className='container' style={{ fontFamily: "Poppins" }}>
                <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                    <div className='col-xl-2 col-lg-2 col-md-6 col-sm-12' style={{ marginLeft: "-2.2rem", marginTop: "-1.6rem" }}>
                        <Navbarhori />
                    </div>

                    <div className='col-xl-10 col-lg-9 col-md-6 col-sm-12'>
                        <br />
                        <div className='row' style={{ width: "100%" }}>
                            <div className='card-8 rounded-border'>
                                <h1><i className="far fa-credit-card" style={{ fontSize: "22px" }}></i> Payments</h1>
                                <hr />
                            </div>
                            <br />

                            <div className="card-5 mt-4 rounded-border">
                                <div className="container">
                                    <table className="table table-striped" style={{ marginTop: '-2rem' }}>
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col"><h5>Order Id</h5></th>
                                                <th scope="col"><h5>Name</h5></th>
                                                <th scope="col"><h5>Amount</h5></th>
                                                <th scope="col"><h5>PaymentID</h5></th>
                                                <th scope="col"><h5>Date</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getuserdata.length > 0 ? (
                                                getuserdata.map((element, id) => (
                                                    <tr key={element.ID}>
                                                        <th scope="row">{id + 1}</th>
                                                         {/* Updated to use the correct field name */}
                                                         <td style={{ fontSize: "16px" }}>
                                                        {element.orderItems.map((item, index) => (
                                                        <div key={index}>{item.service}</div> // Assuming serviceName is the property to display
                                                         ))}
                                                        </td>
                                                        <td style={{ fontSize: "16px" }}>{element.totalAmount}</td>
                                                        <td style={{ fontSize: "16px" }}>{element.userId}</td>                                                       
                                                        <td style={{ fontSize: "16px" }}>
                                                        {new Date(element.orderDate).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: true, // Use false for 24-hour format
                                                        })}
                                                    </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}>No orders available</td>
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
        </>
    );
};

export default Order;
