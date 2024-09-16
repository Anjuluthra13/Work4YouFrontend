import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Showorder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [getuserdata, setUserdata] = useState([]);  // Initial state as an empty array
  const [data, setData] = useState([]);  // Initial state as an empty array
  const [userData, setUserData] = useState({});  // Holds user-specific data

  // Fetch logged-in user data
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
        throw new Error("Failed to fetch user data");
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  // Fetch all order data
  const getdata = async () => {
    try {
      const res = await fetch("https://work4youbackend-production.up.railway.app/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch order data");
      }

      // Ensure the fetched data is an array
      if (Array.isArray(data)) {
        setUserdata(data);
        setData(data);  // Initially set the data to show all results
      } else {
        console.error("Fetched data is not an array");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Filter order data by user ID
  const filterResult = (userId) => {
    if (Array.isArray(getuserdata)) {
      const result = getuserdata.filter((curData) => curData.userId === userId);
      setData(result);
    } else {
      console.error("getuserdata is not an array", getuserdata);
    }
  };

  return (
    <>
      <div className='background8 rowv' style={{ marginBottom: "0rem", marginTop: "0rem" }}>
        <div className="container">
          <br />
          <div className="row rowv4" style={{ color: "white" }}>
            <h1>Home {">"} Payment Details</h1>
          </div>
        </div>
      </div>

      <div className='container' style={{ width: "100%", marginTop: "-32rem", marginBottom: '20rem' }}>
        <div className='row rowv4 card-5' style={{ background: "white", border: "5px solid yellow" }}>
          <div className='col-md-2 mt-5'>
            <center><h4>ServiceName</h4></center>
          </div>
          <div className='col-md-2 mt-5'>
            <center><h4>Amount</h4></center>
          </div>
          <div className='col-md-3 mt-5'>
            <h4>OrderID</h4>
          </div>
          <div className='col-md-2 mt-5'>
            <h4>PaymentID</h4>
          </div>
          <div className='col-md-3 mt-5'>
            <h4>Date</h4>
          </div>
          <hr style={{ width: "100%" }} />
          <div className='row rowv4 mb-5'>
            {data.map((element) => (
              <div key={element.id} className='row mx-2'>
                <div className='col-md-2' style={{ height: "2rem" }}>
                  <center>
                    <p>{element.orderItems.map((item, index) => (
                      <div key={index}>{item.service}</div>
                    ))}</p>
                  </center>
                </div>
                <div className='col-md-1' style={{ height: "2rem" }}>
                  <center><p>{element.totalAmount}</p></center>
                </div>
                <div className='col-md-3' style={{ height: "2rem" }}>
                  <center><p>{element.id.slice(6)}</p></center>
                </div>
                <div className='col-md-2' style={{ height: "2rem" }}>
                  <center><p>{element.userId}</p></center>
                </div>
                <div className='col-md-4' style={{ height: "2rem" }}>
                  <center>
                    <p>{new Date(element.orderDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,  // Change to false for 24-hour format
                    })}</p>
                  </center>
                </div>
              </div>
            ))}
          </div>
          <Link className="btn btn-dark mb-2 mt-5" style={{ width: "10rem" }} onClick={() => filterResult(userData._id)}>Show Payments</Link>
        </div>
      </div>
    </>
  );
};

export default Showorder;
