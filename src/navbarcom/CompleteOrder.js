import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom';
const CompleteOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
 
  const [getuserdata, setUserdata] = useState([]);
  const [data, setData] = useState(getuserdata);

  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
      try {
          const res = await fetch('/about', {
              method: "GET",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
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

    const res = await fetch("/get-order", {
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
            <h1> Home {">"} Orders Details</h1>
          </div>
        
        </div>
       
          

      </div>


      <div className='container' style={{ width: "100%", marginTop: "-32rem", marginBottom: '20rem' }}>

        <div className='row rowv4   card-5' style={{ background: "white", border: "5px solid yellow" }}>

        

      
          <hr width={{ width: "100%" }}></hr>


          <div className='row  rowv4 mb-5' >

            {
              data.map((element) => {
                return (
                  <>
                    <div className='row mx-2'  >
                      <div className='col-md-2 ' style={{height:"2rem"}}>
                        <center><p> {element.amount}</p></center>
                      </div>
                      <div className='col-md-3' style={{height:"2rem"}}>
                        <center> <p> {element.orderId}</p></center>
                      </div>
                      <div className='col-md-3' style={{height:"2rem"}}>
                        <center><p>{element.paymentId}</p></center>
                      </div>
                   
                      <div className='col-md-4 ' style={{height:"2rem"}}>
                        <center>  <p >{element.date}</p></center>
                      </div>
                    </div>
                 
                  </>
                )
              })
            }



          </div>
          <Link  className="btn btn-dark mb-2 mt-5"  style={{width:"12rem"}} onClick={() => filterResult(userData._id)}>Upcoming Orders </Link>
        </div>
       

       




      </div>

    </>
  )
}

export default CompleteOrder