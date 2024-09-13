import React from 'react'
import { Button } from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'

const Navbarhori = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Add your logout logic here, e.g., clear session data
    console.log("User logged out");

    // Redirect to loginadmin page
    history.push('/loginadmin');
  }

  return (
    <div className="filters2">
      <ul style={{ marginLeft: "-2rem" }}>
        <br></br>
        <li><h5><i className='fas fa-user-cog'></i> Admin panel</h5></li>
         <Button onClick={handleLogout}  style={{ color: "black", width: '100%',background:'gray', borderColor:'black'}}>Logout</Button>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}> All Information</p></li>
        <li><h5> <i className="fa fa-bar-chart" style={{ fontSize: "22px" }}></i> <Link to='/admin' style={{ textDecoration: "none", color: "#121212" }}>Dashboard</Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>User Information</p></li>
        <li><h5> <i className="fa fa-user" style={{ fontSize: "25px" }}></i> <Link to='/users' style={{ textDecoration: "none", color: "#121212" }}> Users</Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Payment Information</p></li>
        <li><h5><i className='far fa-credit-card' style={{ fontSize: "22px" }}></i> <Link to="/order" style={{ textDecoration: "none", color: "#121212" }}> Payments</Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Services Information</p></li>
        <li><h5><i className="fa fa-archive" style={{ fontSize: "22px" }}></i> <Link to='/products' style={{ textDecoration: "none", color: "#121212" }}> Services </Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Order Information</p></li>
        <li><h5><i className="fas fa-cart-arrow-down" style={{ fontSize: "22px" }}></i> <Link to='/delivery' style={{ textDecoration: "none", color: "#121212" }}> Orders </Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Feedback Information</p></li>
        <li><h5><i className="fas fa-calendar" style={{ fontSize: "22px" }}></i> <Link to='/complent' style={{ textDecoration: "none", color: "#121212" }}> Feedback </Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Booking Information</p></li>
        <li><h5><i className="fas fa-shopping-cart" style={{ fontSize: "22px" }}></i> <Link to='/bookformonth' style={{ textDecoration: "none", color: "#121212" }}> Book for Month </Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Add Product Information</p></li>
        <li><h4><i className="fas fa-shopping-cart" style={{ fontSize: "22px" }}></i> <Link to='/addproduct' style={{ textDecoration: "none", color: "#121212" }}> Add Product </Link></h4></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Application Information</p></li>
        <li><h5><i className="fa fa-newspaper-o" style={{ fontSize: "22px" }}></i> <Link to='/application' style={{ textDecoration: "none", color: "#121212" }}> Application </Link></h5></li>
        <br></br>
        <hr></hr>
        <li><p style={{ color: "#424242" }}>Local Service</p></li>
        <li><h5><i className="fa fa-newspaper-o" style={{ fontSize: "22px" }}></i> <Link to='/localadd' style={{ textDecoration: "none", color: "#121212" }}> Local Query </Link></h5></li>
        <br></br>
        
       
      </ul>
    </div>
  );
}

export default Navbarhori;
