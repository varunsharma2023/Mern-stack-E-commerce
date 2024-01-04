import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'

export const categoryController = async(req,res)=>{
    try {

        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }

        const existCategory = await categoryModel.findOne({name})
        if (existCategory){
            return  res.status(200).send({
                success:true,
                message:'category already exists',})
        }

        const category = await new categoryModel({name , slug : slugify(name)}).save()
        res.status(201).send({
            success:true,
                message:'new category created successfully', category , 
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in category'
        })
        
        
    }

}


// update category


export const updateCategory = async( req, res)=>{
     try {
        const {name} = req.body
        const {id} = req.params

         const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)} , {new:true})
         res.status(200).send({
            success:true,
                message:'category updated successfully', category ,
         })
        
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error whille updating category'
        })
        
     }

}

// get all category

export const getcategory =  async(req, res)=>{
    try {
        
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
                message:'All category listed', category,
         })
        

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error whille getting category'
        })
        
    }

}


// single category

 export const singlecategory = async(req, res)=>{

    try {

        
        const category = await categoryModel.findOne({slug : req.params.slug})
        res.status(200).send({
            success:true,
                message:'single category listed', category,
         })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error whille getting single category'
        })
        
    }

 }


 // delete category

 export const  deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
                message:'category deleted successfully',
         })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error whille deleting category' , error
        })
        
    }

 }