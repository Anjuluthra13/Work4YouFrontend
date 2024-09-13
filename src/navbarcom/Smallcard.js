import React from 'react'
import image from '../Imagesmall/cleaningsmall.jpg'
import image1 from '../Imagesmall/babysitting.jpg'
import image2 from '../Imagesmall/cookingsmall.jpg'
import image3 from '../Imagesmall/drivesmall.jpg'
import image4 from '../Imagesmall/electriciansmall.jpg'
import image5 from '../Imagesmall/paintwer.jpg'
import image6 from '../Imagesmall/pestsmall.jpg'
import image7 from '../Imagesmall/plumbe4r.jpg'
import { Link } from 'react-router-dom'

const Smallcard = () => {
    return (
        <div className='row rowv5 card-5  ' style={{ borderRadius: "10px" , marginTop:"-2rem" , background:"white"}}>
            <div className='row ' style={{marginLeft:"70px"}}>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>

                        <Link to='/clean'>
                            <img src={image} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                </div>

                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>

                        <Link to='/babycare'>
                            <img src={image1} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                </div>

                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>

                        <Link to='/cooking'>
                            <img src={image2} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                </div>


                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>

                    <center>

                        <Link to='/driver'>
                            <img src={image3} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                </div>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>

                    <center>

                        <Link to='/electric'>
                            <img src={image4} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>                  </div>
                
            </div>
            <div className='row ' style={{marginLeft:"50px"}}>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>

                </div>

                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>

                        <Link to='/Pest'>
                            <img src={image6} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>                  </div>
                    <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>

                    <center>

                         <Link to='/paint'>
                    <img src={image5} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                    </div>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>

                        <Link to='/Plumber'>
                            <img src={image7} className="zoom small-img-size" alt=""></img>

                        </Link>
                    </center>
                </div>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>
                    <center>
{/* 
                        <Link to='/homemaid'>
                            <img src={image3} className="zoom small-img-size" alt=""></img>

                        </Link> */}
                    </center>                    </div>
                <div className='col-lg-2 col-xl-2 col-md-4 col-sm-6 '>

                </div>
            </div>



        </div>
    )
}

export default Smallcard