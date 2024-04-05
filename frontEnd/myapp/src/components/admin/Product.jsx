import axios from 'axios'
import { myContext } from '../context/Context'
import { useContext, useEffect, useState } from 'react'
import '../admin/Product.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from 'react';


const Product = () => {
    // const [modalShow, setModalShow] = React.useState(false);
    const { products, setProducts, name, setName, price, setPrice, image, setImage, category, setCategory,
         description, setDescription, anime, setAnime,qty,setQty,size,setSize } = useContext(myContext)
    const [editId, setEditId] = useState(null)
    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:5000/Product/products")
        setProducts(response.data)
    }
    
    const addProd = async () => {
        try {

            await axios.post(`http://localhost:5000/Product/products`, { name: name, price: price, image: image, category: category, description: description, anime: anime, qty: qty,size:size })
            fetchProducts()
            // alert("product added successfully!")
            setName('')
            setPrice('')
            setImage('')
            setCategory('')
            setDescription('')
            setAnime('')
            setQty('')
            setSize('')
        }
        catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = async (id, deleteProd) => {
        if (window.confirm(`Are you want to delete this product, "${deleteProd}}"?`)) {
            deleteProducts(id);
        }
    }

    const deleteProducts = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Product/products/${id}`)
            fetchProducts()
        }
        catch (error) {
            console.log(error)
        }
    }

    const editProduct = async (Product) => {
        setEditId(Product._id)
        setName(Product.name)
        setPrice(Product.price)
        setImage(Product.image)
        setCategory(Product.category)
        setDescription(Product.description)
        setAnime(Product.anime)
        setQty(Product.qty)
        setSize('')
    }

    const updateProduct = async (Product) => {
        try {
            await axios.put(`http://localhost:5000/Product/products/${Product._id}`, { name: name, price: price, image: image, category: category, description: description, anime, qty:qty,size:size })
            fetchProducts()
            cancelProd()
        }
        catch (error) {
            console.log(error)
        }
    }

    const cancelProd = async () => {
        setEditId(null)
        setName('')
        setPrice('')
        setImage('')
        setCategory('')
        setDescription('')
        setAnime('')
        setQty('')
        setSize('')
    }
    console.log(products)
    console.log("Categorry",category)
    console.log("ANime",anime)
    return (

        <div className="mainP1">



            <div className="addProducts1p">
                <div><h2 style={{ color: 'white', marginTop: '20px' }}><u>Add Products</u></h2></div><br />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <div><input className='inpStyle' value={name} type="text" placeholder='Enter product name...' onChange={(a) => setName(a.target.value)} /></div>
                    <div><input className='inpStyle' value={price} type="text" placeholder='Enter product price...' onChange={(b) => setPrice(b.target.value)} /></div>
                    <div><input className='inpStyle' value={image} type="text" placeholder='Enter product image...' onChange={(c) => setImage(c.target.value)} /></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    {/* <div><input className='inpStyle' value={category} type="text" placeholder='Enter product category...' onChange={(d) => setCategory(d.target.value)} /></div> */}

                    <div>
                    <select style={{fontSize:'18px',color:'gray',textAlign:'left'}} className='inpStyle' value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option style={{textAlign:'center'}}>select product category</option>
                        <option value="oversize" style={{textAlign:'center'}}>oversize</option>
                        <option value="sweatshirt" style={{textAlign:'center'}}>sweatshirt</option>
                        <option value="t-shirt" style={{textAlign:'center'}}>t-shirt</option>
                        <option value="combo" style={{textAlign:'center'}}>combo</option>
                        <option value="AOP" style={{textAlign:'center'}}>AOP</option>
                        <option value="jacket" style={{textAlign:'center'}}>jacket</option>
                        <option value="hoodies" style={{textAlign:'center'}}>hoodies</option>
                        <option value="tanktop" style={{textAlign:'center'}}>tanktop</option>
                    </select>
                </div>

                    <div><input className='inpStyle' value={description} type="text" placeholder='Enter product description...' onChange={(e) => setDescription(e.target.value)} /></div>
                    {/* <div><input className='inpStyle' value={anime} type="text" placeholder='Enter anime name...' onChange={(f) => setAnime(f.target.value)} /></div> */}

                    <div>
                    <select style={{fontSize:'18px',color:'gray',textAlign:'left'}} className='inpStyle' value={anime} onChange={(f)=>setAnime(f.target.value)}>
                        <option style={{textAlign:'center'}}>select anime category</option>
                        <option value="Naruto" style={{textAlign:'center'}}>Naruto</option>
                        <option value="demon slayer" style={{textAlign:'center'}}>demon slayer</option>
                        <option value="jujustu kaisen" style={{textAlign:'center'}}>jujustu kaisen</option>
                        <option value="one piece" style={{textAlign:'center'}}>one piece</option>
                        <option value="tokyo revengers" style={{textAlign:'center'}}>tokyo revengers</option>
                        <option value="dragon ball" style={{textAlign:'center'}}>dragon ball</option>
                        <option value="attack on titan" style={{textAlign:'center'}}>attack on titan</option>
                        {/* <option value="tanktop" style={{textAlign:'center'}}>tanktop</option> */}
                    </select>
                </div>

                    <div><input className='inpStyle' value={qty} type="text" placeholder='Enter anime qty...' onChange={(g) => setQty(g.target.value)} /></div>
                    <div><input className='inpStyle' value={size} type="text" placeholder='Enter anime size...' onChange={(h) => setSize(h.target.value)} /></div>
                </div><br />


                
                <div><Button variant="outline-danger" style={{ width: '200px', borderRadius: '5px' }} onClick={addProd} >Add Products</Button>
                    {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Products
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)} */}

                </div>
            </div>

            <hr style={{ color: 'white', marginTop: '30px' }} />

            <div className="displayProducts">
                <div><h2 style={{ color: 'white' }}><u>Show Products</u></h2></div>
                <div><h4 style={{ color: 'white' }}>Number of Products : {products.length}</h4></div>
                <div className='dispProd' >

                    {
                        products.map((Products) =>
                            <div key={Products._id} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                {
                                    Products._id === editId ? (
                                        <div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product name...' value={name} onChange={(a) => setName(a.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product price...' value={price} onChange={(b) => setPrice(b.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product image...' value={image} onChange={(c) => setImage(c.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product category...' value={category} onChange={(d) => setCategory(d.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit product description...' value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit anime name...' value={anime} onChange={(f) => setAnime(f.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit anime qty...' value={qty} onChange={(g) => setQty(g.target.value)} /></div>
                                            <div><input className='inpStyl' type="text" placeholder='Edit anime size...' value={size} onChange={(h) => setSize(h.target.value)} /></div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10px' }}>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={() => updateProduct(Products)}>Update</Button>
                                                <Button variant="primary" style={{ width: '100px' }} onClick={cancelProd}>cancel</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Card style={{ width: '18rem', margin: '20px' }}>
                                            <Card.Img variant="top" style={{ height: '280px', width: '100%' }} src={Products.image} />
                                            <Card.Body>
                                                <Card.Title>Name : {Products.name}</Card.Title>
                                                <Card.Text>Price : {Products.price}₹</Card.Text>
                                                <Card.Text>Category : {Products.category}</Card.Text>
                                                <Card.Text>qty : {Products.qty}</Card.Text>
                                                <Card.Text>size : {Products.size}</Card.Text>
                                                <Card.Text>anime : {Products.anime}</Card.Text>
                                                <Card.Text style={{ textAlign: "justify" }}>Description : {Products.description}</Card.Text>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <Button variant="primary" style={{ width: '100px' }} onClick={() => editProduct(Products)}>EDIT</Button>
                                                    <Button style={{ width: '100px' }} variant="primary" onClick={() => confirmDelete(Products._id, Products.name)}>DELETE</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                }

                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}
export default Product


