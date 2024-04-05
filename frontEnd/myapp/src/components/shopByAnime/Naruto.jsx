import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Image, Card, Button } from 'react-bootstrap';
import { IoCartOutline } from 'react-icons/io5';
import '../shopByAnime/Naruto.css';
import TwoHeadingsSlide from '../home/TwoHeadingsSlide';
import { myContext } from '../context/Context';
import PopOverSearchButton from '../home/PopoverSearchButton';
import myVideo from '../home/ZORO.gif';
import DropDown from '../home/DropDown';
import { IoMdHeartEmpty } from "react-icons/io";
import DropdownBox1 from '../home/DropdownBox1';
import DropdownBox from '../home/DropdownBox';
import { Link, useNavigate } from 'react-router-dom';
import '../shopByAnime/Naruto.css'
import { FaAngleDown, FaRegHeart } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSearchPlus } from 'react-icons/fa';
import axios from 'axios';
import MyVerticallyCenteredModal from '../home/MyVerticallyCenteredModal';




const Naruto = () => {
    const { products, setProducts, cart, setCart, wishlist, setWishlist, size, setSize } = useContext(myContext)
    const heading1 = 'NOW ENJOY ALL INDIA FREE SHIPPING ON EVERY ORDER'; // First heading text
    const heading2 = 'EXTRA 5% DISCOUNT FOR ALL ONLINE PAYMENTS'; // Second heading text
    const interval = 3000; // Interval between heading changes (in milliseconds)
    const [isShopByAnimeHovered, setIsShopByAnimeHovered] = useState(false);
    const [isShopByProducts, setIsShopByProducts] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [naruto, setNaruto] = useState([])
    const [chckBx, setChckBx] = useState(true)
    const [id, setId] = useState(null)
    const [modalShow, setModalShow] = React.useState(false);
    const [value,setValue] = useState([])
    // const [color,setColor] = useState('white')

    // const [products,setProducts] = useState([])
    const nav = useNavigate()
    const userID = localStorage.getItem("UserId")
    // console.log("UserId", userID)
    // console.log("Naruto", naruto)
    const token = localStorage.getItem('AuthToken')
    // console.log("AuthToken", token)
    // console.log("Products", products)

    // const [checkboxe1, setCheckboxe1] = useState(false)
    const [checkboxe2, setCheckboxe2] = useState(false)
    const [checkboxe3, setCheckboxe3] = useState(false)
    const [checkboxe4, setCheckboxe4] = useState(false)
    const [checkboxe5, setCheckboxe5] = useState(false)
    const [checkboxe6, setCheckboxe6] = useState(false)
    const [checkboxe7, setCheckboxe7] = useState(false)

    useEffect(() => {
        fetchProducts()

    }, []);

    const fetchProducts = async () => {
        try {
            const responseponse = await axios.get("http://localhost:5000/Product/products")
            setProducts(responseponse.data)
        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        handleNaruto()

    }, [products])

    const handleNaruto = async () => {
        setNaruto(products.filter((data) => (data.anime === "Naruto")))

        let priceArray = naruto.map((data) => data.price)
        console.log("Price Array", priceArray)
        // console.log(Math.max(null,priceArray))
        // const maxPrice = priceArray.reduce((initialVal,CurVal) => Math.max(initialVal,CurVal), 0)
        // console.log("maxPrice",maxPrice)
        let maxPrice = Math.max(...priceArray)
        console.log("MaxPrice", maxPrice)
    }

    const filterPrice = async (initial,final) => {
        console.log("Initial",initial,final)
        const result = products.filter((data) => data.anime === "Naruto" && data.price >= initial && data.price <= final)
        setNaruto(result)
    }

    const filteredResults = async (filterItem) => {
        const result = products.filter((data) => data.anime === "Naruto" && data.category === filterItem)
        if(checkboxe2.checked === false){
            handleNaruto()
        }

        if (filterItem === "t-shirt") {
            // setCheckboxe1(true)
        }
        else if (filterItem === "hoodies") {
            setCheckboxe2(true)
        }
        else if (filterItem === "jacket") {
            setCheckboxe3(true)
        }
        else if (filterItem === "sweatshirt") {
            setCheckboxe4(true)
        }
        else if (filterItem === "oversize") {
            setCheckboxe5(true)
        }
        else if (filterItem === "tanktop") {
            setCheckboxe6(true)
        }
        else if (filterItem === "combo") {
            setCheckboxe7(true)
        }
        setNaruto(result)
        setChckBx(false)
    }

    const clearAll = async () => {
        setChckBx(true)
        // setCheckboxe1(false)
        setCheckboxe2(false)
        setCheckboxe3(false)
        setCheckboxe4(false)
        setCheckboxe5(false)
        setCheckboxe6(false)
        setCheckboxe7(false)
        handleNaruto()
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const changeDiv = async (prod, id) => {
        setId(id)
        setSize('S')
    }
    const addToCart = async (prod, id, sizee) => {
        // console.log("Product:", prod);
        // console.log("SIzeee",sizee)
        try {
            if (token) {
                const isProductInCart = cart.find(item => item._id === id && item.size === sizee);
                if (isProductInCart) {
                    alert("Product already exists in cart");
                } else {
                    const response = await axios.put(`http://localhost:5000/Users/cart`, {
                        id: prod._id,
                        userID,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                        qty: prod.qty,
                        size
                    });
                    console.log("response", response);
                    setCart(response.data.user.cart);
                }
            } else {
                alert("Sign in first");
                nav('/Login');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message === "already added") {
                alert("Product already exists in cart");
            } else {
                console.log(err, "Product id not found");
            }
        }
    };


    // console.log("newcart", cart);

    const addToWishlist = async (prod, id) => {
        try {
            if (token) {
                const isProductInWishlist = wishlist.find(wishlistItem => wishlistItem._id === id);
                if (isProductInWishlist) {
                    alert("Product already exists in cart")
                }
                else {
                    const response = await axios.post(`http://localhost:5000/Users/wishlist`, {
                        id: prod._id,
                        userID,
                        name: prod.name,
                        price: prod.price,
                        image: prod.image,
                    })
                    console.log("response", response)
                    setWishlist(response.data.user.cart)

                }
            }
            else {
                alert('SignIn First')
                nav('/Login')
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message === "already added") {
                alert("Product already exists in wishlist")
            }
            else {
                console.log(err, "Product is not found")
            }
        }
    }

    // const displayProduct = async (id) => {
    //     nav(`/ProductDisplay/${id}`)
    // }

    // console.log("first,wishlist", wishlist)


    return (
        <div className="main1H">

            <div className="header1H">

                <div className="header01H" class="bg-primary text-white header01" style={{ display: 'flex', flexDirection: 'row' }}>
                    <TwoHeadingsSlide heading1={heading1} heading2={heading2} interval={interval} />
                </div>

                <div className="header02H">
                    <div className="headerLeft1H">
                        <div style={{ fontSize: '16px', paddingLeft: '100px' }} >
                            <img src={myVideo} alt='ZORO' height={65} width={65} />
                        </div>
                        <Navbar expand="lg" variant="dark" style={{ width: '100%', height: '100%' }}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', marginTop: '16px', marginLeft: '100px'
                                }}>
                                    <Nav.Link onClick={() => nav('/')}><p className="headerTitles1H">HOME</p></Nav.Link>
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

                                    <Nav.Link><p className="headerTitles1H">COMBO</p></Nav.Link>
                                    <Nav.Link><p className="headerTitles1H">NEW LAUNCH</p></Nav.Link>
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
                                    <Nav.Link><IoMdHeartEmpty onClick={() => nav('/Wishlist')} className="headerRightIcons1H" /></Nav.Link>
                                    <Nav.Link onClick={() => nav('/cart/:productId')}><IoCartOutline className="headerRightIcons1H" /></Nav.Link>
                                    <DropDown />
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>


                </div>
            </div>

            <div className="center1N">

                <div className='narutoTitle'><h1>NARUTO</h1></div>
                <div className="narutoTitleImage">
                    <Image height='100%' width='100%' src='https://otakukulture.in/wp-content/uploads/2023/09/Naruto.png'></Image>
                </div>

                <div style={{ display: 'flex', justifyContent: 'Left', alignItems: 'Left', paddingLeft: '150px', marginTop: '30px' }} className='homeNaruto'>
                    <Link to={'/'}><p>Home</p></Link>
                    <p style={{ marginLeft: '20px', marginRight: '20px' }}>/</p> <Link to={'/Naruto'}><p>Naruto</p></Link></div>

                <div className="narutoProducts">

                    <div className="productsLeft">

                        <div className="categoryHead" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '10px' }}><p>CATEGORIES</p></div>
                        <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '20px' }}><p>PRODUCT TYPE</p></div>
                        <div className="productCategory">
                            <div className='checkBoxDiv'><input type="checkbox"  onChange={() => filteredResults("t-shirt")} className='checkBox' /><label>T - Shirt</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe2} onChange={() => filteredResults("hoodies")} className='checkBox' /><label>Hoodies</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe3} onChange={() => filteredResults("jacket")} className='checkBox' /><label>Jacket</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe4} onChange={() => filteredResults("sweatshirt")} className='checkBox' /><label>Sweatshirt</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe5} onChange={() => filteredResults("oversize")} className='checkBox' /><label>Oversize</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe6} onChange={() => filteredResults("tanktop")} className='checkBox' /><label>Tank Top</label></div>
                            <div className='checkBoxDiv'><input type="checkbox" checked={checkboxe7} onChange={() => filteredResults("combo")} className='checkBox' /><label>Combo</label></div>
                        </div>

                        <div className='priceCategory'>
                        {/* <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '30px' }}><p>PRICE</p></div> */}
                            {/* <div>
                            <ReactSlider
    className="horizontal-slider" 
    thumbClassName="example-thumb"
    trackClassName="example-track"
    defaultValue={[0, 2999]}
    // ariaLabel={['Lower thumb', 'Upper thumb']}
                                max={2999}
                                min={0}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    onChange={(value, index) => setValue(value)}
    pearling
    minDistance={10}
/>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}> <p style={{fontSize:'14px'}}>{value[0]}₹</p>
                       <p style={{fontSize:'14px'}}>{value[1]}₹</p>
                        </div>
                        </div> */}
                            <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '30px' }}><p>PRICE</p></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(0,250)} className='checkBox' /><label className='lbl'>0 - 250</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(250,500)}  className='checkBox' /><label className='lbl'>250 - 500</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(500,750)} className='checkBox' /><label className='lbl'>500 - 750</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(750,1000)} className='checkBox' /><label className='lbl'>750 - 1000</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(1000,1250)} className='checkBox' /><label className='lbl'>1000 - 1250</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(1250,1500)} className='checkBox' /><label className='lbl'>1250 - 1500</label></div>
                        <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(1500,1750)} className='checkBox' /><label className='lbl'>1500 - 1750</label></div>
                        {/* <div className='checkBoxDiv'><input type="checkbox" onChange={()=>filterPrice(1750,2000)} className='checkBox' /><label className='lbl'>1750 - 2000</label></div> */}
                        </div>
                        {/* <div className="categoryHead1" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginTop: '30px' }}><p>SIZE</p></div> */}


                    </div>

                    <div className="productsRight">
                        {
                            chckBx === false ? <div style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                                <button style={{ border: 'none', backgroundColor: 'black', color: 'white', fontSize: '12px', height: '25px' }} onClick={clearAll}>Clear all</button></div> : false
                        }
                        {
                            naruto.map((item, cardIndex) => (
                                <div>
                                    {
                                        item._id === id ? (
                                            <Card
                                                style={{ width: '330px', height: '460px', border: 'none', marginTop: '40px', backgroundColor: 'white' }} className='narutoCardChange1'>
                                                <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                                                    <button onClick={() => setId(null)} style={{
                                                        fontSize: '18px', border: 'none', backgroundColor: 'white', fontWeight: 'bold'
                                                    }}>x</button></div>
                                                <div className='narutoCardChange2'>
                                                    <div><p className='homeCardsPrice1' style={{ fontSize: '20px', fontWeight: 'bold' }}>Rs. {item.price}.00</p></div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><p>size: </p> <p style={{ fontSize: '14px', marginTop: '2px' }}> {size}</p></div>
                                                    <div>
                                                        <button
                                                            className="BtnProd"
                                                            onClick={() => setSize('S')}
                                                            style={{ backgroundColor: size === 'S' ? 'orange' : 'red' }}
                                                        >
                                                            S
                                                        </button>
                                                        <button
                                                            className="BtnProd"
                                                            onClick={() => setSize('M')}
                                                            style={{ marginLeft: '20px', backgroundColor: size === 'M' ? 'orange' : 'red' }}
                                                        >
                                                            M
                                                        </button>
                                                        <button
                                                            className="BtnProd"
                                                            onClick={() => setSize('X')}
                                                            style={{ marginLeft: '20px', backgroundColor: size === 'X' ? 'orange' : 'red' }}
                                                        >
                                                            X
                                                        </button>
                                                        <button
                                                            className="BtnProd"
                                                            onClick={() => setSize('XL')}
                                                            style={{ marginLeft: '20px', backgroundColor: size === 'XL' ? 'orange' : 'red' }}
                                                        >
                                                            XL
                                                        </button>
                                                        <button
                                                            className="BtnProd"
                                                            onClick={() => setSize('XXL')}
                                                            style={{ marginLeft: '20px', backgroundColor: size === 'XXL' ? 'orange' : 'red' }}
                                                        >
                                                            XXL
                                                        </button>
                                                    </div>
                                                    <div style={{ marginTop: '20px' }}>
                                                        <Button variant='danger'
                                                            // style={{ backgroundColor: cart.find(items => items.id === item._id && items.size === item.size) ? 'green' : 'black' }}
                                                            className='addtocartNAruto' onClick={() => addToCart(item, item._id, item.size)}>ADD TO CART</Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ) : (

                                            <Card
                                                style={{ width: '300px', border: 'none', marginTop: '40px' }}
                                                onMouseEnter={() => handleMouseEnter(cardIndex)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="slideIconsMainI" style={{ position: 'relative' }}>
                                                    <Link to={(`/ProductDisplay/${item._id}`)}>
                                                        <Card.Img
                                                            // onClick={() => displayProduct(item._id)}
                                                            variant="top"
                                                            src={item.image}
                                                            style={{ width: '330px', height: '410px', objectFit: 'cover' }}
                                                        /></Link>
                                                    {hoveredIndex === cardIndex && (
                                                        <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                                                            <div className='slideIconsI'>
                                                                <Link><FaRegHeart style={{ color: wishlist.some(items => items.id === item._id) ? 'red' : 'white' }}
                                                                    onClick={() => addToWishlist(item, item._id)} className='iconsI' /></Link></div>
                                                            <div className='slideIconsI'>
                                                                <Link><AiOutlineShoppingCart
                                                                    //  style={{ color: cart.some(items => items.id === item._id) ? 'red' : 'white' }}
                                                                    className='iconsI' onClick={() => changeDiv(item, item._id)}
                                                                /></Link>

                                                            </div>
                                                            <div className='slideIconsI'><Link><FaSearchPlus className='iconsI'
                                                                onClick={() => setModalShow(true)}
                                                            />
                                                                <MyVerticallyCenteredModal
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                />
                                                            </Link>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div><p className='homeCards1'>{item.name}</p></div>
                                                <div><p className='homeCardsPrice1'>Rs. {item.price}.00</p></div>
                                            </Card>

                                        )
                                    }



                                </div>




                            ))
                        }
                    </div>

                </div>

            </div>




            <div style={{ height: '100%', width: '100%' }}>
                <Image height="100%" width="100%" src='https://otakukulture.in/wp-content/uploads/2023/09/Footer_HD_-e1674635998929.png'></Image>
            </div>
            <div className="footer1H">

                <div className="footer1aH">
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

                <div className='footBottom1H'><p style={{ fontSize: '13px', fontFamily: 'Poppins,sans-serif', color: 'white' }}>© 2024 ZORO All Rights Responseerved.</p></div>

            </div>
        </div>
    );
};

export default Naruto;
