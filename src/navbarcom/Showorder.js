import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom';
const Showorder = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
 
  const [getuserdata, setUserdata] = useState([]);
  const [data, setData] = useState(getuserdata);

  const [userData, setUserData] = useState({});

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
          const data = await res.json();
          console.log(data);
          setUserData(data);

          if (!res.status === 200) {
              const error = new Error(res.error);
              throw error;
          }


      } catch (err) {
          console.log(err);
         
      }
  }


  useEffect(() => {
      callAboutPage();
  }, []);

  const getdata = async () => {

    const res = await fetch("https://work4youbackend-production.up.railway.app/api/orders", {
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
      setUserdata(data)
      console.log("get data");

    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const filterResult = (catItem) => {
    const result = getuserdata.filter((curData) => {
        return curData.ID === catItem;
    });
    setData(result);
}

  return (
    <>

      <div className='background8 rowv' style={{ marginBottom: "0rem" , marginTop:"0rem" }}>
        <div className="container">
        <br></br>
          <div className="row rowv4" style={{ color: "white" }}>
            <h1> Home {">"} Payment Details</h1>
          </div>
        
        </div>
       
          

      </div>


      <div className='container' style={{ width: "100%", marginTop: "-32rem", marginBottom: '20rem' }}>

        <div className='row rowv4   card-5' style={{ background: "white", border: "5px solid yellow" }}>

          <div className='col-md-2 mt-5'>
            <center><h4> ServiceName </h4></center>
          </div>
          <div className='col-md-2 mt-5'>
            <center><h4> Amount </h4></center>
          </div>

          <div className='col-md-3 mt-5'>
           <h4 className=''> OrderID </h4>
          </div>
          <div className='col-md-2 mt-5'>
          <h4 className=''> paymentID </h4>
          </div>
       
          <div className='col-md-3 mt-5  '>
            <h4 className=''> Date </h4>
          </div>

      
          <hr width={{ width: "100%" }}></hr>


          <div className='row  rowv4 mb-5' >

            {
              data.map((element) => {
                return (
                  <>
                    <div className='row mx-2'  >
                    <div className='col-md-2 ' style={{height:"2rem"}}>
                        <center><p> {element.orderItems.map((item, index) => (
                                                        <div key={index}>{item.service}</div> // Assuming serviceName is the property to display
                                                         ))}</p></center>
                      </div>
                      <div className='col-md-1 ' style={{height:"2rem"}}>
                        <center><p> {element.totalAmount}</p></center>
                      </div>
                      <div className='col-md-3' style={{height:"2rem"}}>
                        <center> <p> {element.id.slice(6)}</p></center>
                      </div>
                      <div className='col-md-2' style={{height:"2rem"}}>
                        <center><p>{element.userId}</p></center>
                      </div>
                   
                      <div className='col-md-4 ' style={{height:"2rem"}}>
                        <center>  <p >{new Date(element.orderDate).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: true, // Use false for 24-hour format
                                                        })}</p></center>
                      </div>
                    </div>
                 
                  </>
                )
              })
            }

          </div>
          <Link  className="btn btn-dark mb-2 mt-5"  style={{width:"10rem"}} onClick={() => filterResult(userData._id)}>Show Payments </Link>
        </div>
      </div>

    </>
  )
}

export default Showorder
