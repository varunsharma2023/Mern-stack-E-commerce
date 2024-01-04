import { comparePassword, hashPassword } from "../utils-helper/auth-utils.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async(req,res) => {
    try {

        const {name , email  , password , phone, address} = req.body

        if(!email || !password || !name || !phone || !address){
            return res.send({ message : 'One or more mandatory field are required'})


        }

        const existingUser  = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message : 'Already registered Please login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name , email , phone , address , password : hashedPassword,

        }).save();

        res.status(201).send({
            success: true,
            message : 'user registered successfully', user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message :(error)
        })
    }


 };

 export const loginController =async(req,res)=>{
    try {

        //extract email and password property form req.body
        const {email , password}= req.body

        if(!email||!password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check the user

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            });
        }
        const match = await comparePassword(password , user.password);
        if(!match){
        return res.status(200).send({
            success:false,
    message:'Invalid password',
});
        }
    //token

    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET , {
        expiresIn :"7d" ,});

        res.status(200).send({
            success:true,
            message:'login successfully', 
            user:{
                name: user.name,
                email: user.email, 
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login'
        })
        
    }

 }


 
  
  //update profile
  export const updateProfile = async (req, res) => {
    try {
      const { name,  password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in Update profile' , error
        }) 
        
    }
 };
    

 

