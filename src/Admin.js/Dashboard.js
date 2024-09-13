import React, { useEffect, useState } from 'react';
import Navbarhori from './Navbarhori';
import Data from '../navbarcom/Data';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState(Data.productData);
    const [getUserdata, setUserdata] = useState([]);
    const [getUserorder, setUserorder] = useState([]);
    const [getUserdelivery, setUserdelivery] = useState([]);
    const [getUserfeedback, setUserfeedback] = useState([]);
    const [getUsermonth, setUsermonth] = useState([]);
    const [adminData, setAdminData] = useState({});

    const fetchData = async (url, setState) => {
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            console.log("Fetched data:", data); // Add this line
            if (res.ok) {
                setState(data);
            } else {
                console.error('Error fetching data', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:8080/api/feedback', setUserfeedback);
        fetchData('http://localhost:8080/api/auth/users', setUserdata);
        fetchData('/get-order', setUserorder);
        fetchData('http://localhost:8080/api/hire', setUserdelivery);
        fetchData('/get-book', setUsermonth);
        fetchData('/get-admin', setAdminData);
    }, []);

    return (
        <div className='container' style={{ fontFamily: 'Poppins' }}>
            <div className='row' style={{ width: '100%', marginTop: '-3.2rem', height: '62rem' }}>
                <div className='col-xl-2 col-lg-2 col-md-6 col-sm-12' style={{ marginLeft: '-2.2rem', marginTop: '-1.6rem' }}>
                    <Navbarhori />
                </div>
                <div className='col-xl-10 col-lg-9 col-md-6 col-sm-12'>
                    <br />
                    <div className='card-8 rounded-border'>
                        <h1 className='mx-5'>
                            <i className="fa fa-bar-chart" style={{ fontSize: '30px' }}></i> Dashboard
                        </h1>
                        <hr />
                        <br />
                    </div>
                    <br />
                    <div className='row' style={{ width: '100%' }}>
                        <div className="row rowv3 mx-2">
                            <div className="col-sm small-box card-7">
                                <i className="fa fa-user fa-2x left1" />
                                <div style={{ display: 'block' }}>
                                    <h5><Link to='/users' style={{ textDecoration: 'none', color: '#121212' }}> Users</Link></h5>
                                    <h5 style={{ fontSize: '20px', color: '#121212' }}>{getUserdata.length}</h5>
                                </div>
                            </div>
                            <div className="col-sm small-box card-7">
                                <i className="fa fa-archive fa-2x left1"></i>
                                <div style={{ display: 'block' }}>
                                    <h5><Link to='/products' style={{ textDecoration: 'none', color: '#121212' }}> Services </Link></h5>
                                    <h5 style={{ fontSize: '20px', color: '#121212' }}>{data.length}</h5>
                                </div>
                            </div>
                            <div className="col-sm small-box card-7">
                                <i className="fa fa-bar-chart fa-2x left1"></i>
                                <h5><Link to="/order" style={{ textDecoration: 'none', color: '#121212' }}> Payments</Link></h5>
                                <h5 style={{ fontSize: '20px', color: '#121212' }}>{getUserorder.length}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{ width: '100%' }}>
                        <div className="row rowv3 mx-2">
                            <div className="col-sm small-box card-7">
                                <i className="fas fa-cart-arrow-down fa-2x left1" />
                                <div style={{ display: 'block' }}>
                                    <h5><Link to='/delivery' style={{ textDecoration: 'none', color: '#121212' }}> Orders </Link></h5>
                                    <h5 style={{ fontSize: '20px', color: '#121212' }}>{getUserdelivery.length}</h5>
                                </div>
                            </div>
                            <div className="col-sm small-box card-7">
                                <i className="fas fa-calendar fa-2x left1"></i>
                                <div style={{ display: 'block' }}>
                                    <h5><Link to='/complent' style={{ textDecoration: 'none', color: '#121212' }}> Feedback </Link></h5>
                                    <h5 style={{ fontSize: '20px', color: '#121212' }}>{getUserfeedback.length}</h5>
                                </div>
                            </div>
                            <div className="col-sm small-box card-7">
                                <i className="fas fa-shopping-basket fa-2x left1"></i>
                                <h5><Link to='/bookformonth' style={{ textDecoration: 'none', color: '#121212' }}>
                                    Subscription for month</Link></h5>
                                <h5 style={{ fontSize: '20px', color: '#121212' }}>{getUsermonth.length}</h5>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='card-8 rounded-border'>
                        <h1 className='mx-5'>
                            <i className="fa fa-bell" style={{ fontSize: '30px' }}></i> Notification
                        </h1>
                        <hr />
                        <br />
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
