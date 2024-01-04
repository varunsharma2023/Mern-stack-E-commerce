import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createproduct, deleteProduct, getproduct, getproductphoto, getsingleproduct, searchproduct, updateProduct } from '../controller/productcontroller.js'
const router = express.Router()

//routes

router.post('/create-product' , requireSignIn , isAdmin , formidable(),  createproduct)

//update product
router.put('/update-product/:pid' , requireSignIn , isAdmin , formidable(),  updateProduct)
//get product

router .get('/get-product' , getproduct)

// get single product
router .get('/get-product/:slug' , getsingleproduct)
router .get('/product-photo/:pid' , getproductphoto)
router .delete('/del-product/:pid' , deleteProduct)

//search product

router.get('/search/:keyword' , searchproduct)

export default router