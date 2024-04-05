import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import '../home/ImageSlider.css';
import { myContext } from '../context/Context';
import axios from 'axios';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function ImageSlider() {
  const [index, setIndex] = useState(0);
  const {size,setSize,products, setProducts,producId,cart, setCart, wishlist, setWishlist} = useContext(myContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const nav = useNavigate()
  const [id,setId] = useState(null)
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const userID = localStorage.getItem("UserId")
    console.log("UserId", userID)
    // console.log("Naruto", naruto)
    const token = localStorage.getItem('AuthToken')
    console.log("AuthToken", token)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/Product/products");
    setProducts(response.data);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Number of cards to display per slide
  const chunkSize = 4;

  // Split products into overlapping chunks of size chunkSize
  const productChunks = [];
  for (let i = 0; i < products.length - chunkSize + 1; i++) {
    productChunks.push(products.slice(i, i + chunkSize));
  }
  const displayProduct = (id) => {
    console.log("id",id);
    
    nav(`/product/${id}`)
  }
  
  console.log("ProductId",producId)

  const addToCart = async (prod, id,sizee) => {
    console.log("Product:", prod);
    console.log("Product:", prod);
    console.log("SIzeee",sizee)
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

const changeDiv = async (prod,id) => {
  setId(id)
  setSize('S')
}

// console.log("newcart", cart);

const addToWishlist = async (prod, id) => {
    try{
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
            console.log("response",response)
            setWishlist(response.data.user.cart)
        }
    }
    else {
        alert('SignIn First')
        nav('/Login')
    }}
    catch (err) {
        if(err.response && err.response.data && err.response.data.message === "already added" ){
            alert("Product already exists in wishlist")
        }
        else{
            console.log(err, "Product is not found")
        }
    }
}

  return (
    <Carousel interval={3000} activeIndex={index} onSelect={handleSelect} controls={false}>
      {productChunks.map((chunk, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-evenly">
            {chunk.slice(0, 15).map((item, cardIndex) => (
             
             <div>
              {
                item._id === id ? (
                  <Card
                                        style={{ width: '330px',height:'460px', border: 'none', marginTop: '40px',backgroundColor:'white' }} className='narutoCardChange1'>
                                            <div style={{display:'flex',justifyContent:'right',alignItems:'right'}}>
                                                <button onClick={()=>setId(null)} style={{
                                                fontSize:'18px',border:'none',backgroundColor:'white',fontWeight:'bold'}}>x</button></div>
                                            <div className='narutoCardChange2'>
                                            <div><p className='homeCardsPrice1' style={{fontSize:'20px',fontWeight:'bold'}}>Rs. {item.price}.00</p></div>
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}><p>size: </p> <p style={{fontSize:'14px',marginTop:'2px'}}> {size}</p></div>
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
                                    <div style={{marginTop:'20px'}}>
                                        <Button variant='danger'
                                        // style={{ backgroundColor: cart.find(items => items.id === item._id && items.size === item.size) ? 'green' : 'black' }}
                                        className='addtocartNAruto' onClick={() => addToCart(item, item._id,item.size)}>ADD TO CART</Button>
                                    </div>
                                    </div>
                                        </Card>
                ) : (

                  <Card key={cardIndex}
                  style={{ width: '300px', border: 'none' }}
                  onMouseEnter={() => handleMouseEnter(cardIndex)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="slideIconsMainI" style={{ position: 'relative' }}>
                    <Link to={(`/ProductDisplay/${item._id}`)}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ width: '300px', height: '410px', objectFit: 'cover' }} 
                      // onClick={() => displayProduct(item._id)}
                    /></Link>
                    {hoveredIndex === cardIndex && (
                      <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                        <div className='slideIconsI'><Link><FaRegHeart style={{color: wishlist.some(items => items.id === item._id) ? 'red' : 'white' }}
                        onClick={() => addToWishlist(item, item._id)}
                        className='iconsI' /></Link></div>
                        <div className='slideIconsI'><Link><AiOutlineShoppingCart 
                        // style={{color: cart.some(items => items.id === item._id) ? 'red' : 'white' }}
                        onClick={() => changeDiv(item, item._id)}
                         className='iconsI' /></Link></div>
                        <div className='slideIconsI'><Link><FaSearchPlus className='iconsI' /></Link></div>
                      </div>
                    )}
                  </div>
                  <div><p className='homeCards1'>{item.name}</p></div>
                  <div><p className='homeCardsPrice1'>Rs. {item.price}.00</p></div>
                  {/* <button style={{backgroundColor:"blue",color:"white"}} onClick={() => displayProduct(item._id)}>view</button> */}
                </Card>

                )
              }
              {/* // <Link to={`/product/${item._id}`}> */}
               
                </div>

              // </Link>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
