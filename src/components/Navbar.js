import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import image from "../image/work4youlogo.png";
import { FaShoppingCart, FaSearch, FaSun, FaMoon, FaTimes, FaMicrophone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import image2 from "../Imagesmall/maidimage.jpg";
import { getUserLocation, fetchCityName } from './locationUtils';
import './styles.css';
import { Badge, Button, Dropdown, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { CartState } from "../reducer/Context";

const MyNavbar = () => {
  const { state: { cart }, dispatch } = CartState();
  const { state } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light');
  const [city, setCity] = useState('Fetching location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const history = useHistory();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const userHome = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            const res = await fetch('http://localhost:8080/api/auth/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token if needed
                },
            });

            const text = await res.text(); // Get the raw response
            console.log('Raw response:', text); // Log the raw response

            if (!res.ok) {
                const errorData = JSON.parse(text); // Parse the error response
                throw new Error(errorData.error || 'Failed to fetch user data');
            }

            const data = JSON.parse(text); // Parse the valid response
            setUserName(data.name); // Adjust if you only want specific fields
        } catch (err) {
            console.error('Failed to fetch user data:', err); // Log the full error
        }
    };

    const updateLocation = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        const cityName = await fetchCityName(latitude, longitude);
        setCity(cityName);
      } catch (error) {
        setCity('Error fetching location');
      }
    };

    userHome();
    updateLocation();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme + '-theme';
  };

  const searchQueryToRouteMap = {
    'driver.': '/driver',
    'babysitter.': '/babycare',
    'cooking.': '/cooking',
    'homeservice.': '/homemaid',
    'pest.': '/pest',
    'cleaning.': '/clean',
    'painter.': '/paint',
    'carpenter.': '/carpenter'
  };

  const services = Object.keys(searchQueryToRouteMap);

  useEffect(() => {
    if (history.location.pathname === '/') {
      setSearchQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [history.location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const route = searchQueryToRouteMap[searchQuery.toLowerCase()];
    if (route) {
      history.push(route);
    } else {
      history.push('/notfound');
    }
    setIsNavbarCollapsed(true);
  }

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredSuggestions = services.filter(service =>
        service.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No match']);
    } else {
      setSuggestions(services);
    }
    setShowSuggestions(true);
  }

  const handleFocus = () => {
    setSuggestions(services);
    setShowSuggestions(true);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion !== 'No match') {
      setSearchQuery(suggestion);
      setSuggestions([]);
      setShowSuggestions(false);
      const route = searchQueryToRouteMap[suggestion.toLowerCase()];
      if (route) {
        history.push(route);
      }
      setIsNavbarCollapsed(true);
    }
  }

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    history.push('/');
    setIsNavbarCollapsed(true);
  }

  const handleNavLinkClick = () => {
    setIsNavbarCollapsed(true);
  };

  const handleDropdownClick = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleDropdownItemClick = (path) => {
    history.push(path);
    setIsNavbarCollapsed(true);
    setOpenDropdown(null);
  };

  const RenderMenu = () => {
    
      return (
        <NavDropdown title={userName.toUpperCase()} id="basic-nav-dropdown" onClick={handleNavLinkClick}>
          <NavDropdown.Item as={Link} to="/about" onClick={handleNavLinkClick}>Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/logout" onClick={handleNavLinkClick}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    
  };

  const handleVoiceSearch = () => {
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognitionInstance = new recognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      console.log('Voice input:', voiceInput); // Debugging output
      setSearchQuery(voiceInput);
      const route = searchQueryToRouteMap[voiceInput.toLowerCase()];
      if (route) {
        history.push(route);
      } else {
        history.push('/notfound');
      }
      setIsNavbarCollapsed(true);

      // Update suggestions based on voice input
      const filteredSuggestions = services.filter(service =>
        service.toLowerCase().startsWith(voiceInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No match']);
      setShowSuggestions(true);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognitionInstance.stop();
    } else {
      recognitionInstance.start();
      setIsListening(true);
    }
  };

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" fixed="top" expanded={!isNavbarCollapsed}>
      <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
        <img src={image} alt="logo" style={{ height: '40px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={theme === 'dark' ? 'text-light' : 'text-dark'} onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>HOME</Nav.Link>
          <Nav.Link as={Link} to="/aboutus" onClick={handleNavLinkClick}>ABOUT US</Nav.Link>
          <Nav.Link as={Link} to="/locals" onClick={handleNavLinkClick}>APPLY FOR JOB</Nav.Link>

          <NavDropdown 
            title="SERVICES" 
            id="basic-nav-dropdown" 
            show={openDropdown === 'services'} 
            onClick={() => handleDropdownClick('services')}
          >
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/homemaid')}>Home Service</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/book')}>Service for Month</NavDropdown.Item>
          </NavDropdown>
          
          {/* <NavDropdown 
            title="APPLY FOR JOB" 
            id="basic-nav-dropdown" 
            show={openDropdown === 'apply'} 
            onClick={() => handleDropdownClick('apply')}
          >
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/contact')}>Professionals</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/locals')}>Locals</NavDropdown.Item>
          </NavDropdown> */}
          <NavDropdown 
            title="SUPPORT" 
            id="basic-nav-dropdown" 
            show={openDropdown === 'support'} 
            onClick={() => handleDropdownClick('support')}
          >
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/contactus')}>CONTACT US</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleDropdownItemClick('/touch')}>FEEDBACK</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="navbar-location" style={{ display: 'flex', alignItems: 'center', marginRight: '2rem', color: theme === 'dark' ? 'white' : 'black' }}>
          <MdLocationOn size={20} />
          <span style={{ marginLeft: '0.5rem' }}>{city}</span>
        </div>
        <form className="d-flex search-bar" onSubmit={handleSearch} style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ paddingLeft: '40px' }} // Adjust padding to accommodate icons
          />
          <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }} />
          {searchQuery && (
            <FaTimes
              style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer' }}
              onClick={handleClearSearch}
            />
          )}
          <FaMicrophone
            size={20}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: theme === 'dark' ? 'white' : 'black' }}
            onClick={handleVoiceSearch}
          />
          {showSuggestions && (
            <ul className="suggestions-list" ref={suggestionsRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, backgroundColor: 'white', border: '1px solid #ddd', padding: 0, margin: 0, listStyle: 'none' }}>
              {suggestions.length > 0 ? suggestions.map(suggestion => (
                <li
                  key={suggestion}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  style={{ padding: '8px', cursor: 'pointer', backgroundColor: 'white' }}
                >
                  {suggestion}
                </li>
              )) : (
                <li style={{ padding: '8px' }}>No match</li>
              )}
            </ul>
          )}
        </form>
        <Dropdown align="end">
          <Dropdown.Toggle variant="btn btn-primary" style={{ width: "5rem", marginRight: "1rem" }}>
            <FaShoppingCart color="white" fontSize="25px" />
            <Badge>{cart.length}</Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 370 }}>
            {cart.length > 0 ? (
              <>
                {cart.map((prod) => (
                  <div className="d-flex mt-2" key={prod.id}>
                    <div className='mx-4'>
                      <img
                        src={image2}
                        className="card-img-small2 mt-2"
                        alt={prod.name}
                      />
                    </div>
                    <div className="cartItemDetail" style={{ marginLeft: '-2rem' }}>
                      <ul>
                        <li>Name: {prod.name}</li>
                        <li>Service: {prod.service}</li>
                        <li>Price: ₹{prod.price}</li>
                      </ul>
                    </div>
                    <AiFillDelete
                      className='mx-5 mt-4'
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </div>
                ))}
                <hr />
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className={`toggle ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
          variant="transparent"
          onClick={toggleTheme}
          style={{ marginRight: '1rem', width: '50px' }}
        >
          {theme === 'dark' ? <FaSun color="#ffffff" /> : <FaMoon color="#000000" />}
        </Button>
        <RenderMenu />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;