import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import image14 from "../image/4photo.jpg"
import image15 from "../image/maid12.jpg"
const Aboutus = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])




  return (
    <>
      <div className='container ' style={{ width: "72%", marginTop: "-2rem" }}>
        <div className='row animated animatedFadeInUp fadeInUp'>
          <center > <h2 style={{ color: "#121212", fontFamily: "Poppins" }}>WELCOME TO<span style={{ color: "#dbaf32" }}> Work4You</span></h2></center>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className='col-md-6' style={{ marginLeft: "0rem" }}>
            <h2 style={{ color: "#121212", fontFamily: "Poppins" }}>WHO ARE<span style={{ color: "#dbaf32" }}> WE?</span></h2>
            <br />
            <p style={{ color: "grey", fontFamily: "Poppins" }}>
            Work4You has been offering maid services in Delhi. As the best maid agency in Delhi, we provide 24-hour maid services across Indian cities. With us, you can find the right maid, domestic help, housemaids, cooks, caretakers, ayahs, peons, nurses, ward boys, babysitters, elderly caretakers, and any domestic help you need. Leveraging the expertise of our professionals, Work4You helps you find the staff that meets your specific requirements. With Work4You, you will definitely find the best domestic helper to ease your life.

            </p>
            <p style={{ color: "grey", fontFamily: "Poppins" }}>We are a private limited company, via our expert team of maids services staff assist people from India to find a solution for their home
              assistance needs. Using our maid services people can search home maids across any Indian cities.</p>
            <br />


            <Link className="btn btn-dark mx-1 " to="/" role="button" style={{ backgroundColor: "#121212" }}>Read More</Link>


          </div>

          <div className='col-md-6' style={{ marginLeft: "0rem", marginTop: "1rem" }} >
            <center>  <img src={image15} alt='error13' className='img-fluid'></img></center>

          </div>


        </div>
        <br />
        <div className='row animated animatedFadeInUp fadeInUp'>
          <div className='col-md-6'>
            <h3 style={{ color: "#121212", fontFamily: "Poppins" }}>Why We Do<span style={{ color: "#dbaf32" }}> Business</span></h3>
            <p style={{ color: "grey", fontFamily: "Poppins" }}>
              At Work4You, we intend to make lives easier by providing maid service in NSTI Noida. Finding domestic help was a hassle until Work4You was launched. We have helped thousands of help seekers find what they are looking for whether it be a maid, cook, domestic helper, nanny or nurse.</p>

          </div>
          <div className='col-md-6'>
            <h3 style={{ color: "#121212", fontFamily: "Poppins" }}>How We <span style={{ color: "#dbaf32" }}>Do It</span></h3>
            <p style={{ color: "grey", fontFamily: "Poppins" }}>With years of experience and trust, Work4You is now recognized as a reliable and dependable maid agency in Kalyan-Dombivali. Using design thinking as a business tool, we create environments, products and services at democratic prices that awe, inspire people and lift them out of the everyday into a happy and creative mental world.</p>

          </div>
        </div>

      </div>






      <div className='container ' style={{ width: "72%", marginTop: "-2rem" }}>
        <div className='row animated animatedFadeInUp fadeInUp' style={{ marginTop: "1rem", fontFamily: "Poppins" }}>
          <div className='col-md-6' style={{ marginLeft: "-1rem" }} >
            <center>  <img src={image14} alt='error14' className='img-fluid photo4'></img></center>

          </div>
          <div className='col-md-6 col-sm-12 ' style={{ marginLeft: "1rem" }}>


            <h3 style={{ color: "#121212" }}>Total Home Facility Services - <span style={{ color: "#dbaf32" }}>Best Facility Management Service in NSTI Noida</span> </h3>
            <p style={{ color: "grey" }}>Trusting a stranger to roam around in your house and clean it properly as if it were their own is a tricky business. We Indians rely on maids heavily and supervising them all the time can be an exhausting task. Total Home Facility Services understands this need to have maids and other services with fewer cons and more pros. We, at Total Home Facility Services, have a staff of resourceful and reliable professionals, all of whom are committed to creating a meaningful, sustainable employment.</p>
            <div className='row'>
              <div className='col-md-6'>

                <h3> <i className="fa fa-gift fa-1x" aria-hidden="true" style={{ color: "#121212" }}></i> Certified Company</h3>
                <p style={{ color: "grey" }}>We can easily say that we are one of the best manpower solutions in Maharashtra.</p>
              </div>
              <div className='col-md-6'>
                <h3><i className="fa fa-thumbs-up fa-1x" aria-hidden="true" style={{ color: "#121212" }}></i> Our Experience</h3>
                <p style={{ color: "grey" }}>We have a long list of satisfied customers who trust our services and have given glowing recommendations.</p>

              </div>
            </div>
            <h3 style={{ color: "#121212" }}>Hire Best Service in<span style={{ color: "#dbaf32" }}> NSTI Noida</span></h3>
            <p style={{ color: "grey" }}>Trust us as a service agency that provides a service best suited for your needs. Call us today to hire a maid. The domestic candidates that we provide have the vital experience and skills to suit your needs and desires. We only place Work4You who know the job well. We conduct thorough background checks so you feel safe and secured with your choice of maids. Contact one of the best maid service agencies now and discover a Service ideal for you. To ease your problems, we have now started our professional services across the nation in Delhi, Pune, Hyderabad, Bangalore, Ahmedabad, Surat and many more.</p>


          </div>
        </div>
      </div>
      <div className="container" style={{ marginBottom: "4rem" }}>
        <p classname="maps" style={{ width: "102.6%", height: "20rem", border: "0", allowfullscreen: "", loading: "lazy" }}><iframe style={{ width: "101%", height: "27rem", border: "0", allowfullscreen: "", loading: "lazy" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.31424593928!2d77.30662918267458!3d28.59034811300048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f48ccfdc81%3A0x23b82756bfac9089!2sNational%20Skill%20Training%20Institute%20for%20Women!5e0!3m2!1sen!2sin!4v1720078999928!5m2!1sen!2sin" ></iframe></p>
      </div>

    </>
  )
}

export default Aboutus