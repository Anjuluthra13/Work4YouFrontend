import React, { useState, useEffect } from 'react';
import Navbarhori from './Navbarhori';

const Bookformonth = () => {
    const [getuserdata, setUserdata] = useState([]);

    // Function to fetch the booking data from the backend
    const getdata = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("https://work4youbackend-production.up.railway.app/api/book-now", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            setUserdata(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Function to parse date manually (assuming format is 'yyyy-MM-dd')
    const formatDate = (dateString) => {
        if (!dateString) return "Invalid date";

        const dateParts = dateString.split("-");
        if (dateParts.length === 3) {
            // Re-arrange to 'MM/dd/yyyy' format
            return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
        }

        return "Invalid date";
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        getdata();
    }, []);
    
    return (
        <>
            <div className="container" style={{ fontFamily: "Poppins" }}>
                <div className="row" style={{ width: "100%", marginTop: "-3.2rem" }}>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ marginLeft: "-2.2rem", marginTop: "-1.6rem" }}>
                        <Navbarhori />
                    </div>

                    <div className="col-xl-10 col-lg-9 col-md-6 col-sm-12">
                        <br />
                        <div className="row" style={{ width: "100%" }}>
                            <div>
                                <h1>
                                    <i className="fas fa-box-open" style={{ fontSize: "22px" }}></i> Subscription for Month
                                </h1>
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
                                                <th scope="col mt-1">
                                                    <h5>Id</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>UserName</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>Email</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>Phone</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>Address</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>Service</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>Start Date</h5>
                                                </th>
                                                <th scope="col">
                                                    <h5>End Date</h5>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getuserdata.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8">No data available</td>
                                                </tr>
                                            ) : (
                                                getuserdata.map((element, id) => (
                                                    <tr key={id}>
                                                        <th scope="row">{id + 1}</th>
                                                        <td style={{ fontSize: "16px" }}>{element.name}</td>
                                                        <td style={{ fontSize: "16px" }}>{element.email}</td>
                                                        <td style={{ fontSize: "16px" }}>{element.phone}</td>
                                                        <td style={{ fontSize: "16px" }}>{element.address}</td>
                                                        <td style={{ fontSize: "16px" }}>{element.service}</td>
                                                        <td style={{ fontSize: "16px" }}>{formatDate(element.startDate)}</td>
                                                        <td style={{ fontSize: "16px" }}>{formatDate(element.endDate)}</td>
                                                    </tr>
                                                ))
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

export default Bookformonth;
