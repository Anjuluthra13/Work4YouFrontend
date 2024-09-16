import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from "../Imagesmall/maidimage.jpg";

const Showdelivary = () => {
    const [userdata, setUserdata] = useState([]);
    const [userData, setUserData] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch user data
    const callAboutPage = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://work4youbackend-production.up.railway.app/api/auth/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                credentials: "include"
            });

            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await res.json();
            setUserData(data);

        } catch (err) {
            console.log('Error:', err);
        }
    };

    // Fetch delivery data
    const getdata = async () => {
        try {
            const res = await fetch("https://work4youbackend-production.up.railway.app/api/hire", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch delivery data');
            }

            const data = await res.json();
            setUserdata(data);

        } catch (err) {
            console.log('Error:', err);
        }
    };

    // Filter orders by user ID
    const filterResult = (userId) => {
        const result = userdata.filter((curData) => curData.userId === userId); // Make sure this field matches your backend
        setFilteredData(result);
    };

    useEffect(() => {
        callAboutPage();
        getdata();
    }, []);

    return (
        <>
            <div className='background8 rowv' style={{ marginBottom: "0rem", marginTop: "0rem" }}>
                <div className="container">
                    <br />
                    <div className="row rowv4" style={{ color: "white" }}>
                        <h1> Home {">"} Orders Details</h1>
                    </div>
                </div>
            </div>

            <div className='container' style={{ width: "100%", marginTop: "-32rem", marginBottom: '20rem' }}>
                <div className='row rowv5 card-5 rounded-border' style={{ background: "white", border: "5px solid yellow" }}>
                    <div>
                        <h2>Upcoming Orders</h2>
                        <br />
                    </div>
                    <hr style={{ width: "100%" }} />

                    <div className='row rowv4'>
                        {(filteredData.length > 0 ? filteredData : userdata).map((element, index) => (
                            <div key={element.id} className='row mx-2 rounded-border mb-5' style={{ border: "1px solid lightgrey" }}>
                                <div className='d-flex mt-2' style={{ color: "grey" }}>
                                    <ul>
                                        <li>{index + 1}</li>
                                    </ul>
                                    <ul>
                                        <li>ORDER PLACED</li>
                                        <li>{element.dates}</li>
                                    </ul>
                                    <ul>
                                        <li>TOTAL</li>
                                        <li>₹ {element.amount}</li>
                                    </ul>
                                    <ul>
                                        <li>SERVICE TO</li>
                                        <li>{element.name}</li>
                                    </ul>
                                    <ul className='margin3'>
                                        <li>ORDER TO DATE</li>
                                        <li>{element.date}</li>
                                    </ul>
                                </div>
                                <hr style={{ width: "97%" }} />
                                <div className='d-flex mb-2'>
                                    <div className='col-md-2'>
                                        <img src={image} className="card-img-small" alt="Service" />
                                    </div>
                                    <div className="col-md-10">
                                        <ul>
                                            <li><h5>Booking Service</h5></li>
                                            <li style={{ color: "grey" }}>{element.service}</li>
                                            <br />
                                            <li><h5>Address</h5></li>
                                            <li style={{ color: "grey" }}>{element.address}</li>
                                        </ul>
                                    </div>
                                </div>
                                <hr style={{ width: "97%" }} />
                                <div>
                                    <h5><i className="fas fa-map-marker-alt"></i> {element.area} </h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link className="btn btn-dark mb-2 mt-5 mx-2" style={{ width: "12rem" }} onClick={() => filterResult(userData._id)}>Upcoming Orders</Link>
                    <Link className="btn btn-dark mb-2 mt-5 mx-2" style={{ width: "12rem" }} to='#'>Completed Orders</Link>
                    <Link className="btn btn-dark mb-2 mt-5 mx-2" style={{ width: "12rem" }} to='/showorder'>Show paymentID</Link>
                </div>
            </div>
        </>
    );
};

export default Showdelivary;
