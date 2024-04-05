import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import "../home/home.css";
import TwoHeadingsSlide from './TwoHeadingsSlide';
import AutoSlideCarousel from './AutoSlideCarousal';
import Card from 'react-bootstrap/Card';
import { myContext } from '../context/Context';
import axios from 'axios';
import PopOverSearchButton from './PopoverSearchButton';
import { Link, useNavigate } from 'react-router-dom';
import myVideo from '../home/ZORO.gif';
import ImageSlider from './ImageSlider';
import DropDown from './DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox from './DropdownBox';
import DropdownBox1 from './DropdownBox1';

// Arrow icons for dropdown menus
import { FaAngleDown } from 'react-icons/fa';

const Home = () => {
    const { newCategory, setNewCategory,products,producId,setProductId } = useContext(myContext)
    const [trends, setTrends] = useState([])
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const nav = useNavigate()
    const images = [
        "https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_41.jpg?v=1708152207",
        'https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_29.jpg?v=1696061675',
        'https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_31.jpg?v=1696066216',
        'https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_19.png?v=1701533516',
    ];

    useEffect(() => {
        fetchCat()
    }, []);

    const fetchCat = async () => {
        const response = await axios.get("http://localhost:5000/category/Category")
        setNewCategory(response.data)
    }
    useEffect(() => {
        fetchTrends()
    }, []);

    const fetchTrends = async () => {
        const response = await axios.get("http://localhost:5000/trends/Trends")
        setTrends(response.data)
    }
     
    console.log(newCategory)
    console.log("Trends", trends)
    console.log(products)
    return (
        <div className="main1">

            <div className="header1">

                <div className="header01" class="bg-primary text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
                </div>

                <div className="header02">
                    <div className="headerLeft1">
                        <div style={{ fontSize: '16px', paddingLeft: '100px' }} >
                            <img src={myVideo} alt='ZORO' height={65} width={65} />
                        </div>
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px', marginLeft: '100px'
                                }}>
                                    <Nav.Link><p className="headerTitles1">HOME</p></Nav.Link>
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


                                    <Nav.Link><p className="headerTitles1">COMBO</p></Nav.Link>
                                    <Nav.Link><p className="headerTitles1">NEW LAUNCH</p></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div className="headerRight1" >
                        <Navbar expand="lg" variant="dark"
                        >
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="mr-auto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}
                                >
                                    <PopOverSearchButton  />
                                    <Nav.Link onClick={()=>nav('/Wishlist')}><IoMdHeartEmpty className="headerRightIcons1" /></Nav.Link>
                                    <Nav.Link onClick={()=>nav('/cart/:productId')}><IoCartOutline  className="headerRightIcons1" /></Nav.Link>
                                    <DropDown />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1">

                <div className="centerSlide1">
                    <AutoSlideCarousel interval={3000} images={images} />
                </div>

                <div className="newlyLaunched">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">Newly Launched</h3></div>
                    <div ><p className='newlyLaunchedP'>Each launch comes with a special price</p></div>
                    <div style={{ paddingTop: '30px' }}>
                        <ImageSlider />
                    </div>

                </div>

                <div className="demands" style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h4 style={{ fontWeight: 'bold' }}>MOST IN DEMAND</h4></div>
                    <div className="demandImages" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                        <div><Link><img alt='' src='https://www.fansarmy.in/cdn/shop/files/3_c5b347eb-ddba-40ea-b817-92c9f4443887_300x.jpg?v=1686031534'></img></Link></div>
                        <div><Link><img alt='' src="https://www.fansarmy.in/cdn/shop/files/4_f64e3e32-64c7-4ea2-a417-478e5ee3a018_300x.jpg?v=1686031535" /></Link></div>
                        <div><Link><img alt='' src="https://www.fansarmy.in/cdn/shop/files/5_77e1f048-18f3-4564-a0fe-ddbbe0ca3675_300x.jpg?v=1686031535" /></Link></div>
                        <div><Link><img alt='' src="https://www.fansarmy.in/cdn/shop/files/2_9df253b8-7712-46cf-887b-d8b5b9d4df0c_300x.jpg?v=1686031535" /></Link></div>
                    </div>
                </div>

                <div className="tshirtTrends">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">T-Shirts In Trends</h3></div>

                    <div className='catDisp'>
                        {
                            trends.map((trend) =>
                                <div><Link>
                                    <Card style={{ width: '18rem', margin: '30px' }}>
                                        <Card.Img variant="top" src={trend.catTrendImage} />
                                    </Card></Link>
                                </div>
                            )
                        }
                    </div>

                </div>

                <div className="others" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Link><Card style={{ width: '430px', margin: '10px' }}><Card.Img src='https://www.fansarmy.in/cdn/shop/files/10_58f1ae68-a09b-4e42-ad27-d22d08037f90_300x.jpg?v=1685967439'></Card.Img></Card></Link>
                    <Link><Card style={{ width: '430px', margin: '10px' }}><Card.Img src='https://www.fansarmy.in/cdn/shop/files/9_e6fb610d-af92-449e-a1ce-1e5583d97d76_300x.jpg?v=1685967439'></Card.Img></Card></Link>
                    <Link><Card style={{ width: '430px', margin: '10px' }}><Card.Img src='https://www.fansarmy.in/cdn/shop/files/8_2e353b34-a15c-4cef-89c3-4e03055d0bd9_300x.jpg?v=1685967439'></Card.Img></Card></Link>
                </div>

                <div className="shopByAnime1">
                    <div className="shopByAnimeHeader1"><h3 class="h3 ft2">Shop By Anime</h3></div>
                    <div><p>Checkout The Products By Anime Collection</p></div>



                    <div className='catDisp'>
                        {
                            newCategory.map((category) =>
                                <div><Link>
                                    <Card style={{ width: '18rem', margin: '30px' }}>
                                        <Card.Img variant="top" src={category.categoryImage} />
                                    </Card></Link>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>



            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                <h2 class="jdgm-carousel-title" className='review'>Review From Our Otaku's</h2>
            </div>
            <hr />
            <div style={{ height: '100%', width: '100%' }}>
                <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>
            </div>
            <div className="footer1">

                <div className="footer1a">
                    <div className="leftFooter1">
                        <div><h4 class="h4" style={{ fontWeight: 'bold', marginLeft: '30px' }}>LOCATION</h4></div>

                        <div class="text custom-text" style={{ paddingLeft: '118px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}>24-A New India Colony,<br />Marine Drive Kochi,<br />683106 Kerala</p>
                            <p style={{ fontSize: '13px', letterSpacing: '1px' }}><b>Email</b><a href="mailto:support@fansarmy.in"> :support@zoro.in</a></p></div>

                    </div>

                    <div className="centerFooter1">
                        <div><h4 class="h4" style={{ fontWeight: 'bold' }}>INFORMATION</h4></div>
                        <div style={{ paddingRight: '52px' }}>
                            <ul><li><a href="/pages/about-us">About Us</a></li><li><a href="/pages/contact-us">Contact Us</a></li><li><a href="/pages/bulk-order">Bulk Order</a></li></ul>
                        </div>
                    </div>

                    <div className="rightFooter1">
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

                <div className='footBottom1'><p style={{ fontSize: '13px', fontFamily: 'Poppins,sans-serif', color: 'white' }}>© 2024 ZORO All Rights Reserved.</p></div>

            </div>
        </div>
    );
};

export default Home;
