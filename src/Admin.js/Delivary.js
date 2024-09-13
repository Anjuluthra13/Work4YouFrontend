import React from 'react';
import { useState, useEffect } from 'react';
import Navbarhori from './Navbarhori';

const Delivary = () => {
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async () => {
        const res = await fetch("http://localhost:8080/api/hire", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setUserdata(data);
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <>
            <div className='container' style={{ fontFamily: "Poppins" }}>
                <div className='row' style={{ width: "100%", marginTop: "-3.2rem" }}>
                    <div className='col-xl-2 col-lg-2 col-md-6 col-sm-12' style={{ marginLeft: "-2.2rem", marginTop: "-1.6rem" }} >
                        <Navbarhori />
                    </div>

                    <div className='col-xl-10 col-lg-9 col-md-6 col-sm-12'>
                        <br />
                        <div className='row' style={{ width: "100%" }}>
                            <div>
                                <h1><i className="fas fa-box-open" style={{ fontSize: "22px" }}></i> Orders</h1>
                            </div>
                            <br />
                            <hr />
                            <div className="card-5">
                                <div className="container">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col"><h5>UserName</h5></th>
                                                <th scope="col"><h5>Amount</h5></th>
                                                <th scope="col"><h5>Address</h5></th>
                                                <th scope="col"><h5>Phone</h5></th>
                                                <th scope="col"><h5>Start Time</h5></th>
                                                <th scope="col"><h5>End Time</h5></th>
                                                <th scope="col"><h5>Service</h5></th>
                                                <th scope="col"><h5>Date</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getuserdata.map((element, index) => (
                                                <tr key={index}>
                                                    <td style={{ fontSize: "16px" }}>{element.name}</td>
                                                    <td style={{ fontSize: "16px" }}>{element.amount}</td>
                                                    <td style={{ fontSize: "16px" }}>{element.address}</td>
                                                    <td style={{ fontSize: "16px" }}>{element.phone}</td>
                                                    <td style={{ fontSize: "16px" }}>{element.stime} AM</td>
                                                    <td style={{ fontSize: "16px" }}>{element.etime} PM</td>
                                                    <td style={{ fontSize: "16px" }}>{element.service}</td>
                                                    <td style={{ fontSize: "16px" }}>{formatDate(element.date)}</td>
                                                </tr>
                                            ))}
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
}

export default Delivary;
