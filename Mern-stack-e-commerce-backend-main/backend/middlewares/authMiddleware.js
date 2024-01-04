import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";
//Protected route based on token

export const requireSignIn = async (req,res,next)=>{
    try {

        const decode = jwt.verify(req.headers.authorization ,
             process.env.JWT_SECRET
             );
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error)
        
    }
};

//admin

export const isAdmin = async (req,res,next)=>{
    try {

        const user = await userModel.findById(req && req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                message : "Unauthorized Access" ,
            });
        }else {
        next();
        }
        
    } catch (error) {
        console.log(error)
        
    }
};