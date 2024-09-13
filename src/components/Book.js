import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import axios from 'axios';

// Define package details
const packageDetails = [
  {
    name: 'Basic Package',
    price: 35000,
    advantages: [
      'Basic service',
      'Standard support',
      'No extra features'
    ]
  },
  {
    name: 'Gold Package',
    price: 45000,
    advantages: [
      'Gold service',
      'Priority support',
      'Includes additional features'
    ]
  },
  {
    name: 'Platinum Package',
    price: 60000,
    advantages: [
      'Platinum service',
      '24/7 support',
      'All inclusive features'
    ]
  }
];

const PackagePopup = ({ packages, onSelect, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h4>Select a Package</h4>
        <div className="package-container">
          {packages.map((pkg, index) => (
            <div className="package-item" key={index} onClick={() => onSelect(pkg)}>
              <h5>{pkg.name}</h5>
              <p><strong>Price:</strong> ₹{pkg.price.toLocaleString()}</p>
              <p><strong>Advantages:</strong></p>
              <ul>
                {pkg.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="popup-button-container">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Book = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    area: "",
    //carrier: "",
    address: "",
    startDate: "",
    endDate: "",
    package: "",
    agree: false
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const callAboutPage = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/auth/getdata', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);




  const notifyError = () => toast.error("Please fill all required fields", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });

  const notifySuccess = () => toast.success("Successfully submitted", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const formatDateToInput = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    const startDate = new Date(selectedDate);
    let endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    if (endDate.getDate() !== startDate.getDate()) {
      endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    }

    const formatDateToInput = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    setUserData(prevState => ({
      ...prevState,
      startDate: formatDateToInput(startDate),
      endDate: formatDateToInput(endDate)
    }));
  };

  const submitData = async (event) => {
    event.preventDefault();

    const { name, lastName, email, phone, service, area, address, startDate, endDate, package: selectedPackage, agree } = userData;

    if (!name || !lastName || !email || !phone || !area || !address || !service || !startDate || !endDate || !selectedPackage || !agree) {
      notifyError();
    } else {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/book-now', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name, lastName, email, phone, service, area, address, startDate, endDate, package: selectedPackage
          })
        });

        if (res.ok) {
          notifySuccess();
          setUserData({
            name: "",
            lastName: "",
            email: "",
            phone: "",
            service: "",
            area: "",
            address: "",
            startDate: "",
            endDate: "",
            package: "",
            agree: false
          });
        } else {
          notifyError();
        }
      } catch (err) {
        console.error("Error during submission:", err);
        notifyError();
      }
    }
  };

  const handlePackageSelect = (pkg) => {
    setUserData(prevState => ({ ...prevState, package: pkg.name }));
    setSelectedPackage(pkg);
    setShowPopup(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="container" style={{ marginTop: "-2rem" }}>
        <div className="row rowv3">
          <div className="col-sm small-box card-7">
            <i className="fa fa-phone-square fa-2x left1" />
            <div style={{ display: "block" }}>
              <h5>Phone No</h5>
              <p style={{ fontSize: "13px", color: "#121212" }}>+918595957070</p>
            </div>
          </div>
          <div className="col-sm small-box card-7">
            <i className="far fa-envelope fa-2x left1"></i>
            <div style={{ display: "block" }}>
              <h5>Email</h5>
              <p style={{ fontSize: "13px", color: "#121212" }}>oak.work4you@gmail.com</p>
            </div>
          </div>
          <div className="col-sm small-box card-7">
            <i className="fas fa-map-marker-alt fa-2x left1"></i>
            <h5>Location</h5>
            <p style={{ fontSize: "13px", color: "#121212" }}>
              D-1, Block D, Sector 1, Noida,<br /> Uttar Pradesh 201301
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />

      <section className="contactus-section left">
        <div className="container card-6" style={{ marginTop: "2rem", marginBottom: '8rem', background: "#c5c3c3" }}>
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="contact-rightside col-12 col-lg-12">
                  <form onSubmit={submitData}>
                    <div className="row">
                      <div className="col-md-12" style={{ marginTop: "2rem", marginBottom: "3rem", color: "#121212" }}>
                        <h3>BOOK NOW</h3>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>First Name</p>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={userData.name}
                          onChange={postUserData}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Last Name</p>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          value={userData.lastName}
                          onChange={postUserData}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-3rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", marginTop: "16px", fontFamily: "poppins" }}>Area</p>
                        <input
                          className="form-control"
                          name="area"
                          type="text"
                          value={userData.area}
                          onChange={postUserData}
                          placeholder="Enter your area"
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Service</p>
                        <select
                          className="form-control"
                          name="service"
                          value={userData.service}
                          onChange={postUserData}
                          required
                        >
                          <option value="">Select</option>
                          <option value="driver">Driver</option>
                          <option value="babysitter">Babysitter</option>
                          <option value="pestcontrol">Pestcontrol</option>
                          <option value="cleaning">Cleaning</option>
                          <option value="maid">Maid</option>
                        </select>
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Phone Number</p>
                        <input
                          type="number"
                          name="phone"
                          className="form-control"
                          placeholder="888 888 8888"
                          value={userData.phone}
                          onChange={postUserData}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Email</p>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={userData.email}
                          onChange={postUserData}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Start Date</p>
                        <input
                          type="date"
                          name="startDate"
                          className="form-control"
                          min={today}
                          value={userData.startDate}
                          onChange={handleStartDateChange}
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>End Date</p>
                        <input
                          type="date"
                          name="endDate"
                          className="form-control"
                          value={userData.endDate}
                          readOnly
                          required
                        />
                      </div>
                      <div className="col-12 col-lg-4 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Package</p>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Select a package"
                          value={userData.package}
                          onClick={() => setShowPopup(true)}
                          onChange={postUserData}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 contact-input-feild" style={{ marginTop: "-2.5rem", fontWeight: "bold" }}>
                        <p style={{ fontSize: "20px", marginBottom: "0px", fontFamily: "poppins" }}>Address</p>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="Flat No., Apt Name, Area, Street, City"
                          value={userData.address}
                          onChange={postUserData}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check form-checkbox-style" style={{ marginTop: "-1rem" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agree"
                        checked={userData.agree}
                        id="flexCheckChecked"
                        onChange={(e) => setUserData(prevState => ({ ...prevState, agree: e.target.checked }))}
                        required
                      />
                      <label className="form-check-label main-hero-para" style={{ color: "#121212", fontFamily: "poppins" }}>
                        I agree that the work4you Company may contact me at the email address or phone number above
                      </label>
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: "2rem",
                        marginBottom: "3rem",
                        backgroundColor: "grey",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 0.5rem",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "bold"
                      }}
                      className="btn btn-dark"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render Popup */}
      {showPopup && (
        <PackagePopup
          packages={packageDetails}
          onSelect={handlePackageSelect}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Book;
