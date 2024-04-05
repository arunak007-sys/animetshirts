
import React, { useContext, useState } from 'react';
import { Offcanvas, Container, Nav } from 'react-bootstrap';
import { CiSearch } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { myContext } from '../context/Context';
import { useNavigate } from "react-router-dom";

const PopOverSearchButton = () => {
    const {products,setSeacrhItem,serInp,setSerInp} = useContext(myContext)
    const [show, setShow] = useState(false);
    
    const nav = useNavigate()
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function searchInput(a){
        setSerInp(a.target.value)
    }
    // console.log("Products",products)
    
    function handleSearch (){
            if(serInp === null || serInp === ""){
            }
            else{
                const query = serInp
            setSerInp(query)
            const filteredResults = products.filter((user) => {
                const { name, price, category,anime } = user

                return (
                    name.toLowerCase().includes(query.toLowerCase()) ||
                    price.toString().includes(query) ||
                    category.toLowerCase().includes(query.toLowerCase()) ||
                    anime.toLowerCase().includes(query.toLowerCase()) 
                )
            })
            setSeacrhItem(filteredResults)
            nav('/SearchItem')
            // setSerInp('')
            handleClose()
            }
    }
// console.log("FIltered",searchItem)
    return (
        <>
          <Link>
            <IoSearchOutline className="headerRightIcons111"  onClick={handleShow}/>
            </Link>  

            <Offcanvas  show={show} onHide={handleClose} placement="top">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>What are you looking for?</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container style={{display:'flex',flexDirection:'row',marginTop:'20px',justifyContent:'center',alignItems:'center'}}>
                    <input style={{width:'100%',borderRadius:'5px',border:'1px thin',height:'50px'}}  onChange={searchInput} class="input-group__field search__input" type="search" name="q" placeholder="Search for products, brands and more" value={serInp} autocomplete="off"/>
                    <Nav.Link ><CiSearch onClick={handleSearch} style={{color:'black',fontSize:'40px',marginLeft:'8px'}} className="headerRightIcons111" /></Nav.Link>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default PopOverSearchButton;
