const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const Product = require('../model/productModel')


const getUser = async (req, res) => {
    try {
        const getUs = await User.find()
        console.log(getUs)
        res.json(getUs)
    }
    catch (error) {
        res.json({ message: error.message })
        console.log(error)
    }
}

const userRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword, confirmPassword })
        await user.save()
        res.status(201).json("User registered successfully")
    } catch (error) {
        // Send the actual error message received from the catch block
        res.status(400).json({ message: error.message || "Registration Failed" })
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1hr" })


            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60,
            })
            res.setHeader("Authorization", token)
            console.log(token, "requested token")

            res.status(200).json({ message: "Welcome user", token, user })
        }
        else {
            res.status(401).send("Invalid email or password")
        }
    }
    catch (error) {
        // Send the actual error message received from the catch block
        res.status(400).json({ message: error.message || "Login Failed" })
        console.log(error)
    }
}

// ADD TO CART

const addToCart = async (req, res) => {
    try {
        const { id, userID, name, price, image, qty,size } = req.body;
        console.log("userid", userID);
        const user = await User.findOne({ _id: userID });
        console.log("user", user);
        const existingItem = user.cart.find(item => item.id === id && item.size === size);

        if (existingItem) {
            return res.status(400).json({ message: "already added" });
            // existingItem.qty += qty
        } else {
            user.cart.push({
                id,
                name,
                price,
                image,
                qty,
                size
            });
            await user.save();
            res.status(200).json({ message: "successfully added to cart", user });
        }
    } catch (error) {
        res.status(400).json({ message: "unable to add", error });
    }
};

// const increeementQty = async (req, res) => {
//     try {
//         const { userID } = req.body;
//         const { id } = req.params;
//         console.log("ID", userID, id);
//         const user = await User.findOne({ _id: userID });

//         // Find the index of the cart item by comparing the item id
//         const cartItemIndex = user.cart.findIndex(item => item.id === id);

//         console.log(cartItemIndex);

//         if (cartItemIndex !== -1) {
//             // Increment the quantity of the cart item
//             user.cart[cartItemIndex].qty += 1;

//             // Save the updated user object
//             await user.save();

//             // Send response with updated cart item quantity
//             res.json({ message: 'Cart item quantity increased', data: user.cart[cartItemIndex] });
//             console.log("Updated Cart Item:", user.cart[cartItemIndex]);
//         } else {
//             console.log("Cart item not found");
//             res.status(404).json({ message: 'Cart item not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// };

const increeementQty = async (req,res) => {
    try{
        const {userID,cart} = req.body
        const {id} = req.params
      
        console.log("first",userID,id)
        console.log("cart",cart)
       const updatedCart =  cart.map(data => {if(data.id === id){
        data.qty
    }
    return data
})
             
    console.log("Updated Cart",updatedCart)
        // console.log("Quantity",ItemQty)
        await User.findByIdAndUpdate(userID,{cart:updatedCart})
        
        res.send({success:"true"})
    }
    catch (err) {
        console.log(err)
    }
}



const removeCart = async (req, res) => {
    try {
        const { userID,size } = req.body;
        const { id } = req.params;
        console.log("userid", userID);
        const user = await User.findOne({ _id: userID });
        console.log("user", user);
        const existingItem = user.cart.find(item => item.id === id && item.size === size);
        // Find the user by ID and pull the product with the given ID from the cart array

        if(existingItem){

        }
        const users = await User.findByIdAndUpdate(
            userID,
            {
                $pull: {
                    cart: { id,size } // Remove the product with the given ID from the cart array
                }
            },
            {
                new: true // Return the updated user object
            }
        );

        // Check if the user exists and return the updated user object
        if (users) {
            res.status(200).json({ message: "Product successfully removed from cart", user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // Handle any errors that occur during the removal process
        console.error(error);
        res.status(400).json({ message: "Unable to remove product from cart", error });
    }
};



const getCart = async (req, res) => {
    const userID = req.body.UserId
    try {
        const getCart = await User.findOne({ _id: userID })
        console.log(getCart)
        res.json(getCart)
    }
    catch (err) {
        console.log(err)
    }
}

// WISHLIST
const addToWishlist = async (req, res) => {
    try {
        const { id, userID, name, price, image } = req.body
        console.log("UserID", userID)
        const user = await User.findOne({_id: userID})
        console.log("user",user)
        const existingItem = user.wishlist.find(item => item.id === id);

        if(existingItem){
            return res.status(400).json({message: "already added"})
        }
        else{
            user.wishlist.push({
                id,name,price,image
            })
            await user.save()
            res.status(200).json({ message : "successfully added to wishlist",user})
        }
        }
    catch (err) {
        console.log(err)
        res.status(400).json({ message : 'unable to add', err})
    }
}

const removeWishlist = async (req,res) => {
    try {
        const { userID } = req.body;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            userID,
            {
                $pull : 
                {
                    wishlist : {id}
                }
            },
            {
                new : true
            }
        )
    // Check if the user exists and return the updated user object
    if (user) {
        res.status(200).json({ message: "Product successfully removed from wishlist", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
} catch (error) {
    // Handle any errors that occur during the removal process
    console.error(error);
    res.status(400).json({ message: "Unable to remove product from wishlist", error });
}
}

const getWishlist = async (req,res) => {
    try{
        const userID = req.body.UserId
        const getWishlist = await User.findOne({_id : userID})
        console.log(getWishlist)
        res.json(getWishlist)
    }
    catch (err) {
        console.log(err)
    }
}

//     const{ name,price,image } = req.body
//     console.log("Request recieved :", req.body);

//     try{
//         const user = await User.findOne({_id : userId})
//         console.log("user",user)

//         if(!user) {
//             return res.status(400).json( { msg : "User not found" })
//         }

//         const existingUser = await user.cart.find(item => item.id === id)

//         if(existingUser) {

//         }
//         else{
//             user.cart.push({ name,price,image})
//         }
//         await user.save()
//     }
//     catch (error){
//         console.log(error)
//         res.status(500).json({ error : 'Internal server error'})
//     }
// }


module.exports = { getUser, userRegister, loginUser, addToCart, getCart, removeCart,
addToWishlist,getWishlist,removeWishlist,increeementQty }