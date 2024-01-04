import express from 'express'
import { categoryController, deleteCategory, getcategory, singlecategory, updateCategory } from '../controller/categorycontroller.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
const router = express.Router()

// create category route
router.post('/create-cat', requireSignIn, isAdmin , categoryController);

//update catefory route
router.put('/update-category/:id' , requireSignIn , isAdmin , updateCategory)


// get all category

router.get('/getcategory' , getcategory);

//single category
router.get('/singlecategory/:slug' , singlecategory);

//delete category
router.delete('/delete-category/:id' , requireSignIn , isAdmin , deleteCategory)

export default router;