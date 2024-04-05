import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../context/Context';

function DropDown() {
  const nav = useNavigate()
  const {setLoginEmail,setCart,setWishlist} = useContext(myContext)
  const token = localStorage.getItem('AuthToken')
    // console.log("AuthToken",token)
    const gmail = localStorage.getItem('loginEmail')
    const handleLogout = async () => {
      localStorage.removeItem("AuthToken")
      localStorage.removeItem("UserId")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("authToken")
      setWishlist('')
      setCart('')
      nav('/Login')
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <Dropdown >
        <Dropdown.Toggle style={{backgroundColor:'black',borderColor:'black'}} id="dropdown-basic">
          <FaRegUser className="headerRightIcons112" />
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            width: '300px',
            position: 'absolute',
            top: 'calc(100% + 0.5rem)', // Adjust vertical position to below the icon
            right: '0', // Align to the right of the icon
            left: 'auto', // Reset left to default
            border:'1px thick',
          }}
        >
          <Dropdown.Item>My Account</Dropdown.Item>
          <hr style={{ marginLeft: '20px', marginRight: '20px' }} />
          <Dropdown.Item>Wishlist</Dropdown.Item>
          <hr style={{ marginLeft: '20px', marginRight: '20px' }} />
          <Dropdown.Item>Check Order</Dropdown.Item>
          <Dropdown.Item>
            <div style={{ display: 'flex', flexDirection: 'column',marginTop:'15px' }}>
              {
                token === null ? (
                  <>
                  <Button style={{ width: '100%' }} onClick={()=>nav('/Login')} variant="dark">
                LOGIN
              </Button>
              <Button onClick={()=>nav('/RegisterForm')} style={{ width: '100%', border: '1px solid', marginTop: '10px' }} variant="light">
                REGISTER HERE
              </Button>
                  </>
                ) : (
                  <>
                  <Button onClick={handleLogout} style={{ width: '100%', border: '1px solid', marginTop: '10px' }} variant="dark">
                LOGOUT
              </Button>
                  </>
                )
              }
              
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDown;
