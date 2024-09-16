import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Showorder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [getuserdata, setUserdata] = useState([]); // Stores user data from API
  const [data, setData] = useState([]); // Stores order data to display
  const [userData, setUserData] = useState({}); // Stores user data for filtering

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
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }

      const data = await res.json();
      console.log(data);
      setUserData(data); // Set user data
      
    } catch (err) {
      console.error("Error fetching user data:", err.message);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  const getdata = async () => {
    try {
      const res = await fetch("https://work4youbackend-production.up.railway.app/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch orders');
      }

      const data = await res.json();
      console.log(data);

      if (Array.isArray(data)) {
        setUserdata(data); // Set user data if it's an array
        setData(data); // Set initial data for display
        console.log("Data fetched successfully");
      } else {
        console.error("Fetched data is not an array", data);
      }
    } catch (err) {
      console.error("Error fetching order data:", err.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const filterResult = (catItem) => {
    if (Array.isArray(getuserdata)) {  // Check if getuserdata is an array
      const result = getuserdata.filter((curData) => curData.ID === catItem);
      setData(result);
    } else {
      console.error("getuserdata is not an array or is undefined", getuserdata);
    }
  };

  return (
    <>
      <div className='background8 rowv' style={{ marginBottom: "0rem", marginTop: "0rem" }}>
        <div className="container">
          <br />
          <div className="row rowv4" style={{ color: "white" }}>
            <h1> Home {">"} Payment Details</h1>
          </div>
        </div>
      </div>

      <div className='container' style={{ width: "100%", marginTop: "-32rem", marginBottom: '20rem' }}>
        <div className='row rowv4 card-5' style={{ background: "white", border: "5px solid yellow" }}>
          <div className='col-md-2 mt-5'>
            <center><h4> Service Name </h4></center>
          </div>
          <div className='col-md-2 mt-5'>
            <center><h4> Amount </h4></center>
          </div>
          <div className='col-md-3 mt-5'>
            <h4 className=''> Order ID </h4>
          </div>
          <div className='col-md-2 mt-5'>
            <h4 className=''> Payment ID </h4>
          </div>
          <div className='col-md-3 mt-5'>
            <h4 className=''> Date </h4>
          </div>
          <hr width={{ width: "100%" }} />
          
          <div className='row rowv4 mb-5'>
            {data.map((element) => (
              <div className='row mx-2' key={element.id}> {/* Use a unique key for each row */}
                <div className='col-md-2' style={{ height: "2rem" }}>
                  <center>
                    <p>
                      {element.orderItems.map((item, index) => (
                        <div key={index}>{item.service}</div> // Displaying service name
                      ))}
                    </p>
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
                      hour12: true, // Use false for 24-hour format
                    })}</p>
                  </center>
                </div>
              </div>
            ))}
          </div>
          <Link className="btn btn-dark mb-2 mt-5" style={{ width: "10rem" }} to="/about">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Showorder;
