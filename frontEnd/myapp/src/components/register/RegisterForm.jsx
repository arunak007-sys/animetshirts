import React, { useContext, useState } from 'react';
import { Form, Button, Nav, Navbar, Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import { myContext } from '../context/Context';
import axios from 'axios';
import "../home/home.css";
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import PopOverSearchButton from '../home/PopoverSearchButton';
import '../register/RegisterForm.css'
import '../register/PopupMessage'
import PopupMessage from '../register/PopupMessage';
import {Link, useNavigate} from 'react-router-dom'
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from 'react-icons/io';
import myVideo from '../home/ZORO.gif'
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { FaAngleDown } from 'react-icons/fa6';


const RegisterForm = () => {
  const {products} = useContext(myContext)
  const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
  const nav = useNavigate()
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
  } = useContext(myContext);
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const submitForm = async () => {
  try {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!username) {
      setUsernameError("Name can't be blank");
      setTimeout(() => {
        setUsernameError('');
      }, 2000); // hide error after 2 seconds
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError("Email can't be blank");
      setTimeout(() => {
        setEmailError('');
      }, 2000); // hide error after 2 seconds
    } else if (!email.match(validRegex)) {
      setEmailError("Invalid email address");
      setTimeout(() => {
        setEmailError('');
      }, 2000); // hide error after 2 seconds
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError("Password can't be blank");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password can't be blank");
      setTimeout(() => {
        setConfirmPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one digit");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      setTimeout(() => {
        setPasswordError('');
      }, 2000); // hide error after 2 seconds
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        setTimeout(() => {
          setConfirmPasswordError('');
        }, 2000); // hide error after 2 seconds
      } else {
        setConfirmPasswordError('');
        const response = await axios.post('http://localhost:5000/Users/users', { username, email, password, confirmPassword });

        if (response.status === 201) {
          setPopupMessage("Registration success");
          setTimeout(() => {
            setPopupMessage('');
            setShowPopup('');
            nav('/Login');
          }, 2000); // hide error after 2 seconds
          setShowPopup(true);
        } else {
          setPopupMessage("Registration failed");
          setShowPopup(true);
        }
      }
    }
  } 
 catch (error) {
  console.log(error);
  if (error.response && error.response.data) {
    if (error.response.data.message.includes('username')) {
      setPopupMessage("Username already exists");
    } else if (error.response.data.message.includes('email')) {
      setPopupMessage("Email already exists");
    } else {
      setPopupMessage("Registration failed");
    }
    setShowPopup(true);

    // Hide error message after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  } else {
    setPopupMessage("Error: " + error.message);
    setShowPopup(true);

    // Hide error message after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
}
};


  const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
  const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
  const interval = 3000; // Interval between heading changes (in milliseconds)
  const category=[...new Set(products.map(data=>data.category))]
  return (
    <div className="main1R">
      {/* Header code */}
      <div className="header1H">

<div className="header01H" class="bg-primary text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
</div>

<div className="header02H">
    <div className="headerLeft1H">
        <div style={{ fontSize: '16px', paddingLeft: '100px' }} >
        <Link to={('/')}><img src={myVideo} alt='ZORO' height={65} width={65} /></Link>
        </div>
        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{
                     display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px',marginLeft:'100px' }}>
                    <Nav.Link onClick={()=>nav('/')}><p className="headerTitles1H">HOME</p></Nav.Link>
                    <Nav.Link
                                        onMouseEnter={() => setIsShopByProducts(true)}
                                        onMouseLeave={() => setIsShopByProducts(false)}
                                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }} // Set position relative to parent link and align items to center
                                    >
                                        <p className="headerTitles1">SHOP BY PRODUCTS</p> {isShopByProducts ? <FaAngleDown style={{ marginBottom: '20px' }} /> : <FaAngleDown style={{ marginBottom: '20px' }} />}
                                        {isShopByProducts && <DropdownBox1 onMouseEnter={() => setIsShopByProducts(true)} onMouseLeave={() => setIsShopByProducts(false)} />} {/* Render dropdown if hovered */}
                                    </Nav.Link>

                                    <Nav.Link
                                        onMouseEnter={() => setIsShopByAnimeHovered(true)}
                                        onMouseLeave={() => setIsShopByAnimeHovered(false)}
                                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }} // Set position relative to parent link and align items to center
                                    >
                                        <p className="headerTitles1">SHOP BY ANIME</p>
                                        {isShopByAnimeHovered ? <FaAngleDown style={{ marginBottom: '20px' }} /> : <FaAngleDown style={{ marginBottom: '20px' }} />} {/* Render arrow based on hover */}
                                        {isShopByAnimeHovered && <DropdownBox onMouseEnter={() => setIsShopByAnimeHovered(true)} onMouseLeave={() => setIsShopByAnimeHovered(false)} />} {/* Render dropdown if hovered */}
                                    </Nav.Link>

                    <Nav.Link onClick={()=>nav(`/ProductsDisplay/${category[3]}`)}><p className="headerTitles1H">COMBO</p></Nav.Link>
                    <Nav.Link onClick={()=>nav('/NewLaunch')}><p className="headerTitles1H">NEW LAUNCH</p></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    <div className="headerRight1H" >
        <Navbar expand="lg" variant="dark"
        >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}
                >
                    <PopOverSearchButton />
                    <Nav.Link onClick={()=>nav('/Wishlist')}><IoMdHeartEmpty className="headerRightIcons1H" /></Nav.Link>
                    <Nav.Link onClick={()=>nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                    <DropDown/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>


</div>
</div>

      <div className="centerR1" style={{ marginTop: "150px", display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div className="regHeadR" style={{ marginTop: '50px' }}>
          <h2 style={{ fontWeight: 'bold' }}>Register</h2>
        </div>

        <div className="regFormR">
          <Form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div>
              <Form.Group controlId="formBasicUsername">
                <Form.Label style={{ fontWeight: 'bold' }}>Username</Form.Label>
                <Form.Control
                  style={{ width: '500px', height: '50px', border: '1px solid' }}
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: 'bold', marginTop: '20px' }}>Email address</Form.Label>
                <Form.Control
                  style={{ width: '500px', height: '50px', border: '1px solid' }}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
              </Form.Group>
            </div>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontWeight: 'bold', marginTop: '20px' }}>Password</Form.Label>
              <Form.Control
                style={{ width: '500px', height: '50px', border: '1px solid' }}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6} // Example validation for minimum length
                required
              />
              {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label style={{ fontWeight: 'bold', marginTop: '20px' }}>Confirm Password</Form.Label>
              <Form.Control
                style={{ width: '500px', height: '50px', border: '1px solid' }}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6} // Example validation for minimum length
                required
              />
              {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
            </Form.Group>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
              <input type="checkbox" style={{ marginBottom: '38px', marginRight: '10px' }} />
              <p>I have read the terms and conditions, privacy policy and review <br /> guidelines and agree to them.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <Button onClick={submitForm} variant="dark" style={{ width: '500px', height: '50px' }} >
                Register
              </Button>
            </div>
          </Form>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <Link to={'/Login'} style={{color:'black'}}> <h4 style={{fontSize:'18px',fontWeight:'bold'}}>Already have an account? Login</h4></Link></div>
        </div>
      </div>

      {/*  */}

      <div style={{height:'100%',width:'100%'}}>
        <hr />
                    {/* <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>  */}
            </div>
            <div className="footer1H" style={{paddingTop:'100px'}}>

                <div className="footer1aH" style={{backgroundColor:'black'}}>
                    <div className="leftFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold', marginLeft: '30px' }}>LOCATION</h4></div>

                        <div class="text custom-text" style={{ paddingLeft: '118px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}>24-A New India Colony,<br />Marine Drive Kochi,<br />683106 Kerala</p>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}><b>Email</b><a href="mailto:support@fansarmy.in"> :support@zoro.in</a></p></div>

                    </div>

                    <div className="centerFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold' }}>INFORMATION</h4></div>
                        <div style={{ paddingRight: '52px' }}>
                            <ul><li><a href="/pages/about-us">About Us</a></li><li><a href="/pages/contact-us">Contact Us</a></li><li><a href="/pages/bulk-order">Bulk Order</a></li></ul>
                        </div>
                    </div>

                    <div className="rightFooter1H">
                        <div><h4 class="h4" style={{ fontWeight: 'bold' }}>CUSTOMER SERVICES</h4></div>
                        <div style={{ paddingRight: '5px' }}>
                            <ul><li><a href="/policies/shipping-policy">Shipping Policy</a></li>
                                <li><a href="/policies/refund-policy">Return and Replace Policy</a></li>
                                <li><a href="/pages/cancellation-policy">Cancellation Policy</a></li>
                                <li><a href="https://fanfreeak.myshopify.com/apps/return_prime">Return and Replace Portal</a></li>
                                <li><a href="/policies/terms-of-service">Terms of Service</a></li></ul>
                        </div>
                    </div>
                </div>
                
                <div className='footBottom1H'><p style={{ fontSize: '13px', fontFamily: 'Poppins,sans-serif',color:'white' }}>© 2024 ZORO All Rights Reserved.</p></div>

            </div>
      {showPopup && <PopupMessage message={popupMessage} />}
    </div>
  );
};

export default RegisterForm;

