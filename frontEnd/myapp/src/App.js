import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { myContext } from './components/context/Context';
import Home from './components/home/Home';
import { useEffect, useState } from 'react';
import Product from './components/admin/Product';
import MyNavbar from './components/home/MyNavbar';
import NavBarHover from './components/home/NavBarHover';
import AdminManagement from './components/admin/AdminManagement';
import CategoryManagement from '../src/components/admin/CategoryManagement';
import PopoverSearchButton from './components/home/PopoverSearchButton';
import RegisterForm from './components/register/RegisterForm';
import HomeCopy from './components/home/HomeCopy';
import Login from './components/login/Login';
import UserManagement from './components/admin/userManagement';
import ImageSlider from './components/home/ImageSlider';
import DropDown from './components/home/DropDown';
import Naruto from './components/shopByAnime/Naruto';
import axios from 'axios';
import DemonSlayer from './components/shopByAnime/DemonSlayer';
import JujustuKaisen from './components/shopByAnime/JujustuKaisen';
import ProductDisplay from './components/productDisplay/ProductDisplay';
import SearchItem from './components/searchItem/SearchItem';
import Cart from './components/cart/Cart';
import Wishlist from './components/wishlist/Wishlist';
import TokyoRevengers from './components/shopByAnime/TokyoRevengers';
import OnePiece from './components/shopByAnime/OnePiece';
import BuyNow from './components/buyNow/BuyNow';
import MyVerticallyCenteredModal from './components/home/MyVerticallyCenteredModal';
import ProductList from './components/shopByAnime/ProductList';

function App() {
const [products,setProducts] = useState([])
const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [image,setImage] = useState("")
const [category,setCategory] = useState("")
const [description,setDescription] = useState("")
const [anime,setAnime] = useState("")
const [producId,setProductId] = useState("")
const [qty,setQty] = useState("")
const [size,setSize] = useState("")
const [searchItem,setSeacrhItem] = useState([])
const [serInp,setSerInp] = useState("")

const [newCategory,setNewCategory] = useState([])
const [categoryName,setCategoryName] = useState("")
const [categoryImage,setCategoryImage] = useState("")

const [newTrendsCategory,setNewTrendsCategory] = useState([])
const [catTrendName,setCatTrendName] = useState("")
const [catTrendImage,setCatTrendImage] = useState("")

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [banBtn,setBanBtn] = useState([])

const [loginEmail,setLoginEmail] = useState('')
const [loginPassword,setLoginPassword] = useState('')

const [productDisp,setProductDisp] = useState([])

const [cart,setCart] = useState([])
const [wishlist,setWishlist] = useState([])

const fetchProducts = async () => {
  const response = await axios.get("http://localhost:5000/Product/products")
  setProducts(response.data)
}
const userID = localStorage.getItem("UserId")
    // console.log("UserId", userID)
useEffect(() => {
  fetchProducts()
}, []);
useEffect(() => {
  fetchCart()
}, [])
// console.log("Cart", cart)

const fetchCart = async () => {
  try {

      const response = await axios.post('http://localhost:5000/Users/getCart', { UserId: userID })
      setCart(response.data.cart)
  } catch (error) {
      console.log(error);
  }
}
useEffect(()=>{
  fetchWishlist()
},[])
const fetchWishlist = async () => {
  try{
      const response = await axios.post('http://localhost:5000/Users/getWishlist', {UserId: userID})
      setWishlist(response.data.wishlist)
      
  }
  catch (err) {
      console.log(err)
  }
}

const values = {
  products,setProducts,name,setName,price,setPrice,image,setImage,category,setCategory,description,setDescription,anime,setAnime,qty,setQty,producId,setProductId,
  newCategory,setNewCategory,categoryName,setCategoryName,categoryImage,setCategoryImage,size,setSize,
  username,setUsername,email,setEmail,password,setPassword,confirmPassword,setConfirmPassword,banBtn,setBanBtn,
  newTrendsCategory,setNewTrendsCategory,catTrendName,setCatTrendName,catTrendImage,setCatTrendImage,
  searchItem,setSeacrhItem,serInp,setSerInp,productDisp,setProductDisp,
  loginEmail,setLoginEmail,loginPassword,setLoginPassword,
  cart,setCart,wishlist,setWishlist,
}



  return (
    <div className="App">
      <BrowserRouter>
      <myContext.Provider value={values}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Product' element={<Product/>}/>
          <Route path='/AdminManagement' element={<AdminManagement/>}/>
          <Route path='/CategoryManagement' element={<CategoryManagement/>}/>
          <Route path='/UserManagement' element={<UserManagement/>}/>
          <Route path='/HomeCopy' element={<HomeCopy/>}/>
          <Route path='/ImageSlider' element={<ImageSlider/>}/>
          <Route path='/DropDown' element={<DropDown/>}/>

          {/* CART */}
          <Route path='cart/:productId' element={<Cart/>}/>

          {/* WISHLIST */}
          <Route path='/Wishlist' element={<Wishlist/>}/>

          {/* BUYNOW */}
          <Route path='/BuyNow' element={<BuyNow/>}/>

          {/* HOME */}
          <Route path='/MyNavbar' element={<MyNavbar/>}/>
          <Route path='/NavbarHover' element={<NavBarHover/>}/>
          <Route path='/PopoverSearchButton' element={<PopoverSearchButton/>}/>
          <Route path='/SearchItem' element={<SearchItem/>}/>
          {/* <Route path='/Modals' element={<MyVerticallyCenteredModal/>}/> */}

          {/* REGISTER */}
          <Route path='/RegisterForm' element={<RegisterForm/>}/>
          <Route path='/Login' element={<Login/>}/>

          {/* SHOP BY ANIME */}
          <Route path='/Naruto' element={<Naruto/>}/>
          <Route path='/DemonSlayer' element={<DemonSlayer/>}/>
          <Route path='/JujustuKaisen' element={<JujustuKaisen/>}/>
          <Route path='/TokyoRevengers' element={<TokyoRevengers/>}/>
          <Route path='/OnePiece' element={<OnePiece/>}/>

          {/* PRODUCT DISPLAY */}
          <Route path='/ProductDisplay/:productId' element={<ProductDisplay/>}/>

          {/* <Route path='/ProductList' element={<ProductList/>}/> */}

        </Routes>
      </myContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
