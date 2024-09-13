import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../image/babysitting.jpg";
import image15 from "../image/homemaid.jpg";
import image16 from "../image/logo1.jpg";
import image20 from "../image/cooking.jpg";
import image22 from "../image/logo2.jpg";
import image23 from "../image/logo3.jpg";
import image24 from "../image/logo4.jpg";
import image35 from '../imagesmall2/plumber.jpg';
import image36 from '../imagesmall2/babysiter.jpg';
import image37 from '../imagesmall2/carpainter.jpg';
import image38 from '../imagesmall2/cooking.jpg';
import image39 from '../imagesmall2/driver.jpg';
import image40 from '../imagesmall2/housekeeping.jpg';
import image41 from '../imagesmall2/homemaid.jpg';
import image44 from '../imagesmall2/electrician.jpg';
import image46 from '../imagesmall2/painter.jpg';
import Smallcard from '../navbarcom/Smallcard';

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [userName, setUserName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const userHome = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserName(data.name);
        setFeedbackMessage("Welcome back! We hope you find what you need.");
      } else {
        setErrorMessage('Unable to load user data. Please try again later.');
      }
    } catch (err) {
      setErrorMessage('An error occurred while fetching data.');
      console.error(err);
    }
  };

  const getdata = async () => {
    try {
      const res = await fetch("/get-massage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("Error fetching messages.");
      } else {
        setUserdata(data);
        console.log("Messages fetched successfully.");
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    userHome();
    getdata();
  }, []);

  // Display error message if present
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }


  return (
    <>
<div className='background9  rowv2'>

<div className='container ' >

  <div className='row left2' style={{ marginTop: "1rem", color: "white", marginLeft: "3rem" }}>

    <h1 style={{ color: "#dbaf32", fontSize: "60px" }}>Work4You</h1>
    <h2 style={{ marginTop: "1rem" }}> we can have a little bit of extra time to do <br></br> something we love.
      <br></br><span><h2 style={{ color: "#dbaf32" }}>Don't we?</h2>   </span></h2>
    <h3><i className="fas fa-map-marker-alt" style={{ color: "red", marginTop: "0rem" }} ></i> NSTI Noida</h3>
    <br></br>
    <br></br>
    <Link to='/aboutus' className='btn btn-warning  ' style={{ width: "8rem", marginLeft: "1rem" }}>Read More</Link>

  </div>
</div>
</div>

<Smallcard></Smallcard>

<br></br>

<div className='container card-8'>
        <div className="row rowv7">
          <div className='row'>
            <center><h1>Special Service</h1>
              <h5 style={{ color: "grey" }}>Home Maid | Cleaning | Babysitter </h5>
            </center>

          </div>


          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>


          <div className='row '>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
              <center>
                <Link to="/clean">
              

                  <img src={image41} alt="" className="small-img-size3 zoom2"></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Home Maid</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/babycare">
           

                  <img src={image36} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Babysitter</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/Cooking">
                <img src={image38} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Cooking</h4></center>
            </div>

          </div>
        </div>
      </div>
<br></br>

<div className='container card-8'>
        <div className="row rowv7">
          <div className='row'>
            <center><h1>Home Repair</h1>
              <h5 style={{ color: "grey" }}>get 20% discount on this services</h5>
            </center>

          </div>


          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>


          <div className='row '>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
              <center>
                <Link to="/Plumber">
            

                  <img src={image35} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Plumber</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/Carpenter">
                

                  <img src={image37} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Carpenter</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/electric">
                
                  <img src={image44} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Electrician</h4></center>
            </div>

          </div>
        </div>
      </div>
<br></br>

<div className='container card-8'>
        <div className="row rowv7">
          <div className='row'>
            <center><h1>Other Services</h1>
              <h5 style={{ color: "grey" }}>get 10% discount on this services</h5>
            </center>

          </div>


          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>


          <div className='row '>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
              <center>
                <Link to="/driver">
                

                  <img src={image39} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Driver</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/homemaid">

                  <img src={image40} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Housekeeping</h4></center>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>

              <center>
                <Link to="/paint">
               

                  <img src={image46} alt="" className="small-img-size3 zoom2 "></img>
                </Link>
                <br></br>
                <br></br>
                <h4>Painter</h4></center>
            </div>

          </div>
        </div>





      </div>
<br></br>

<div className='background3' style={{ width: "101%", fontFamily: "Poppins" }}>
  <div className='tranbox3'>
    <div className='row animated animatedFadeInUp fadeInUp' style={{ marginTop: "3rem" }}>
      <center>
        <h2 style={{ color: "white", marginTop: "1.5rem" }}>
          WELCOME TO {userName} <span style={{ color: "#dbaf32" }}>Work4You</span>
        </h2>
      </center>
      <br />
      <br />
      <br />
      <h5 style={{ color: "white"}}><center>
        Every day has become complicated and stressful. We often wish that we had a genie who could take some load off our daily
        chores so that we can have a little bit of extra time to do something we love. Don’t we? Our domestic help—housemaid, cook,
        babysitter, nanny, etc.—often act as those wizards, but they are hardly dependable.</center>
      </h5>
    </div>

    <div className="container" style={{ marginTop: "-2rem" }}>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="card center right zoom" style={{ width: "20rem", marginTop: "2rem" }}>
            <img className="card-img-top" src={image15} alt="House Maid Services" />
            <div className="card-body">
              <center>
                <h5 className="card-title">HOUSE MAID SERVICES</h5>
                <p className="card-text">
                We provide maids that work either part-time or full-time and who are responsible for the cleanliness and maintenance
                  of an area in a workplace or a house. In a home setting, these maids work under the constant supervision of a household manager.
                </p>
                <Link to="/book" type="button" className="btn btn-dark">
                  Book now
                </Link>
              </center>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="card center zoom" style={{ width: "20rem", marginTop: "2rem" }}>
            <img className="card-img-top" src={image1} alt="Baby Sitter" />
            <div className="card-body">
              <center>
                <h5 className="card-title">BABY SITTER</h5>
                <p className="card-text">
                  The process of hiring a caretaker for your baby can be stressful, and a lot of things have to be taken into consideration.
                  We understand this complex process and aspire to make it easy and safe for you.
                </p>
                <Link to="/book" type="button" className="btn btn-dark">
                  Book now
                </Link>
              </center>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="card center left zoom" style={{ width: "20rem", marginTop: "2rem" }}>
            <img className="card-img-top" src={image20} alt="Cook" />
            <div className="card-body">
              <center>
                <h5 className="card-title">COOK</h5>
                <p className="card-text">
                  Every meal you eat should be nutritious, fresh, and well-cooked. Food is the most important part of our lives as
                  our physical health, mental health, and daily stamina depend on it.
                </p>
                <Link to="/book" type="button" className="btn btn-dark">
                  Book now
                </Link>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className='container' style={{ margin: "-4rem" }}>
</div>

<div className='row' style={{ marginTop: "3rem" }}>
  <center>
    <h3>WHY CHOOSE US</h3>
    <h5 style={{ color: "grey", marginTop: "2rem" }}>
      The worlds latest in clean cleaning service companies. We can clean your
      residential space, including homes.
    </h5>
    <hr />
  </center>
</div>

<div className='container'>
  <center>
    <div className='row'>
      <div className='col-md-6 col-lg-6 col-xl-3 col-sm-12'>
        <div className="card center card-5 animated animatedFadeInUp fadeInUp" style={{ width: "18rem", marginTop: "1rem" }}>
          <center>
            <img className="card-img-top" style={{ width: "60%" }} src={image16} alt="Service Guarantee" />
            <div className="card-body">
              <h5 className="card-title">SERVICE GUARANTEE</h5>
              <p className="card-text">We offer this guarantee because we are confident in the services we offer. We only hire the most qualified professionals to provide high-quality services.</p>
            </div>
          </center>
        </div>
      </div>

      <div className='col-md-6 col-lg-6 col-xl-3 col-sm-12'>
        <div className="card center card-5 animated animatedFadeInUp fadeInUp" style={{ width: "18rem", height: "24.5rem", marginTop: "1rem" }}>
          <center>
            <img className="card-img-top" style={{ width: "60%" }} src={image22} alt="Safe and Reliable" />
            <div className="card-body">
              <h5 className="card-title">SAFE AND RELIABLE</h5>
              <p className="card-text">Your safety is our first priority, so we have the best people we can trust for our customers. We check the background of candidates and also check their references.</p>
            </div>
          </center>
        </div>
      </div>

      <div className='col-md-6 col-lg-6 col-xl-3 col-sm-12'>
        <div className="card center card-5 animated animatedFadeInUp fadeInUp" style={{ width: "18rem", marginTop: "1rem" }}>
          <center>
            <img className="card-img-top" style={{ width: "60%" }} src={image23} alt="Free Replacement" />
            <div className="card-body">
              <h5 className="card-title">FREE REPLACEMENT</h5>
              <p className="card-text">If the maid leaves for any reason within the contract period, we will replace with another maid free of charge to your complete satisfaction.</p>
            </div>
          </center>
        </div>
      </div>

      <div className='col-md-6 col-lg-6 col-xl-3 col-sm-12'>
        <div className="card center card-5 animated animatedFadeInUp fadeInUp" style={{ width: "18rem", height: "24.5rem", marginTop: "1rem" }}>
          <center>
            <img className="card-img-top" style={{ width: "60%" }} src={image24} alt="High Quality" />
            <div className="card-body">
              <h5 className="card-title">HIGH QUALITY</h5>
              <p className="card-text">We provide the highest quality services by exceeding your expectations. Only qualified maids are registered with us.</p>
            </div>
          </center>
        </div>
      </div>
    </div>
  </center>
</div>


        <div className='row head2 footer-booknow' >

        <div className='col-lg-8 col-md-8 ' style={{ color: "white", marginTop: "1.2rem", marginBottom: "1.2rem" }} >
          <center> <h3 className='small2'>Are you looking for Professional Maid <br></br> Service for Your House?</h3></center>

        </div>
        <div className='col-lg-4 col-md-4' style={{ color: "white", marginTop: "2.5rem" }}>
          <center>  <h4 className='small3 '><i className="fa fa-phone-square" ></i> Call +918595957070  or  <span>    <Link to="/book" type="button" className="btn btn-outline-warning mx-1" >
            Book now
          </Link></span></h4></center>

        </div>
      </div>

    </>

  )
}
export default Home