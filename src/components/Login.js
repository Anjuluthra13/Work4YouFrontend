import React, { useContext, useState, useEffect } from 'react';
import image from "../image/login.jpg";
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { dispatchs } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true); // To track component mount status
  const [userName, setUserName] = useState(''); // State to store the user's name

  const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });

  const notifySuccess = () => toast.success("Login Successfully", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      setIsMounted(false);
    };
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (isMounted) notifyError(errorData.error || "Login failed");
        return; // Early return if login failed
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // Store token locally

      if (isMounted) {
        notifySuccess();

        // Fetch user data after successful login
        const userDataRes = await fetch('http://localhost:8080/api/auth/getdata', {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.token}` // Send the token for authentication
          }
        });

        if (userDataRes.ok) {
          const userData = await userDataRes.json();
          setUserName(userData.name); // Set the user's name
          console.log("User data:", userData); // Optional: log user data
        } else {
          notifyError("Failed to fetch user data");
        }

        history.push("/"); // Redirect to home or another page
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (isMounted) notifyError("An unexpected error occurred. Please try again.");
    } finally {
      if (isMounted) setLoading(false); // Ensure setLoading is called only if component is still mounted
    }
  };


  return (
    <>
      <section className="contactus-section" style={{ marginTop: "10rem", marginBottom: "14rem" }}>
        <div className="container">
          <div className="row card-5" style={{ margin: "0rem 2rem", padding: "2rem" }}>
            <div className="col-md-6 col-lg-6">
              <h1 style={{ fontWeight: "bold" }}>Login</h1>
              <br />

              <form onSubmit={loginUser}>
                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                  <i className="fa fa-envelope icon"></i>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    autoComplete='off'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-container" style={{ marginTop: '1.5rem' }}>
                  <i className="fa fa-key icon"></i>
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    autoComplete='off'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark" style={{ marginTop: "2rem" }} disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
            <div className="col-md-6 col-lg-6" style={{ padding: "4rem" }}>
              <center>
                <img src={image} className="img-fluid" style={{ width: "300px" }} alt="Login" />
              </center>
              <center>
                <Link to="/register" style={{ textDecoration: "none" }}>Create an account</Link>
              </center>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
