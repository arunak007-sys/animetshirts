const Product = require('../model/productModel')
const ProductCategory = require('../model/categoryModel')
const ProdTrendsCat = require('../model/categoryModel2')

// PRODUCTS

const getAllProducts = async (req,res) => {
    try {
        const getProd = await Product.find()
        // console.log(getProd)
        res.json(getProd)
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}

const addProduct = async (req,res) => {
    try {
        const {name,price,description,image,category,anime,qty,size} = req.body
        const postProd = new Product({name,price,description,image,category,anime,qty,size});
        await postProd.save()
        // console.log(postProd)
        res.json("Product added successfully")
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}

const editProduct = async (req,res) => {
    try{
        const {name,price,description,image,category,anime,qty,size} = req.body
        const {id} = req.params
        const editProd = await Product.findByIdAndUpdate(id,{name,price,description,image,category,anime,qty,size},{new:true})
        console.log(editProd)
        res.json(editProd)
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params
        console.log("Recieved id : ", id)
        await Product.findByIdAndDelete(id)
        res.json("Product deleted successfully")
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }

}

// ADD TO CART

// const addToCart = async = (req,res) => {
//     try{
//         const {id} = req.params
        
//         const product = Product.find(product => product.id === id)

//         if(!product){
//             return res.status(404).send('Product not found !!!')
//         }
//     Product.cart.push(product)
//     res.status(200).send('Product added to cart')

//     }
//     catch (err){
//         console.log(err)
//         res.json(err)
//     }
// }

// GET CATEGORY

// SEARCH

// const handleSearch = async (req,res) => {
//     try{
//         const searchTerm = req.query.q
//         const searchCriteria = req.query.criteria
//         let query = {}
//         if(searchCriteria === 'name'){
//             query = {name: { $regex: searchTerm, $options: 'i' }}
//         }
//         else if(searchCriteria === 'price'){
//             query = {price: searchTerm }
//         }
//         else if(searchCriteria === 'category'){
//             query = {category: { $regex: searchTerm, $options: 'i' }}
//         }
//         else if(searchCriteria === 'anime'){
//             query = {anime: { $regex: searchTerm, $options: 'i' }}
//         }
//         else{
//             return res.status(400).json({ error : 'Invalid search criteria'})
//         }

//         const products = await Product.find(query)
//         res.json(products)
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({error: 'Internal server error' })
//     }
    
// }

// PRODUCT CATEGORY
const getProductCategory = async (req,res) => {
    try {
        const getProdCat = await ProductCategory.find()
        console.log(getProdCat)
        res.json(getProdCat)
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}
const addProductCategory = async (req,res) => {
    try {
        const {categoryImage,categoryName} = req.body
        const postProdCat = new ProductCategory({categoryName,categoryImage});
        await postProdCat.save()
        console.log(postProdCat)
        res.json("Category added successfully")
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}

const editProductCategory = async (req,res) => {
    try{
        const {categoryName,categoryImage} = req.body
        const {id} = req.params
        const editProdCat = await ProductCategory.findByIdAndUpdate(id,{categoryImage,categoryName},{new:true})
        console.log(editProdCat)
        res.json(editProdCat)
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }
}

const deleteProductCategory = async (req,res) => {
    try{
        const {id} = req.params
        console.log("Recieved id : ", id)
        await ProductCategory.findByIdAndDelete(id)
        res.json("Product deleted successfully")
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }

}

// CATEGORY BY TRENDS

const getProductCategoryTrends = async (req,res) => {
    try {
        const getTrendsProdCat = await ProdTrendsCat.find()
        console.log(getTrendsProdCat)
        res.json(getTrendsProdCat)
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}

const addProductCategoryTrends = async (req,res) => {
    try {
        const {catTrendName,catTrendImage} = req.body
        const postProdCatTrends = new ProdTrendsCat({catTrendName,catTrendImage});
        await postProdCatTrends.save()
        console.log(postProdCatTrends)
        res.json("Category Trends added successfully")
    }
    catch (error) {
        console.log(error)
        res.json({message : error.message})
    }
}

const editProductCategoryTrends = async (req,res) => {
    try{
        const {catTrendName,catTrendImage} = req.body
        const {id} = req.params
        const editProdCatTrends = await ProdTrendsCat.findByIdAndUpdate(id,{catTrendName,catTrendImage},{new:true})
        console.log(editProdCatTrends)
        res.json(editProdCatTrends)
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }
}

const deleteProductCategoryTrends = async (req,res) => {
    try{
        const {id} = req.params
        console.log("Recieved id : ", id)
        await ProdTrendsCat.findByIdAndDelete(id)
        res.json("Product deleted successfully")
    }
    catch (error){
        console.log(error)
        res.json({message : error.message})
    }

}

const getSpecificProduct = async (req,res) => {
    try {
        const {id} = req.params
        // console.log("first",id)
        const getProd = await Product.findById(id)
        res.json(getProd)
        // console.log(getProd)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {getAllProducts,addProduct,editProduct,deleteProduct,
    getProductCategory,addProductCategory,editProductCategory,deleteProductCategory,
    getProductCategoryTrends,addProductCategoryTrends,editProductCategoryTrends,deleteProductCategoryTrends,
    getSpecificProduct
    // addToCart

}