const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')

route.get('/users',userController.getUser)
route.post('/users',userController.userRegister)

route.post('/login',userController.loginUser)
route.put('/cart',userController.addToCart)
route.post('/getCart',userController.getCart)
route.put('/deleteCart/:id',userController.removeCart)

route.put('/cart/:id',userController.increeementQty)

route.post('/wishlist',userController.addToWishlist)
route.post('/getWishlist',userController.getWishlist)
route.put('/deleteWishlist/:id',userController.removeWishlist)

module.exports = route