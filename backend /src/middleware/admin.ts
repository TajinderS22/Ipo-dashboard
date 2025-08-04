import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';


const jwtPassword=process.env.JWT_ADMIN_PASSWORD||'TREX9888'

    interface AuthedRequest extends Request {
        userId?: string;
    }


export const adminMiddleware=(req:AuthedRequest,res:Response,next:any)=>{
    const token = req.headers['authorization'];

     if (!token) {
        res.status(401).json({
            message: "Authorization tokens are missing"
        });
        return 
    }


    const decodedId:any=jwt.verify(token,jwtPassword)

    if(decodedId){
        req.userId=decodedId.id
        next()
    }else{
        res.status(403).json({
            message:"invalid or expired token "
        })
    }
}