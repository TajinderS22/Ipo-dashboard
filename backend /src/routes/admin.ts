import { Router,Request, request } from "express"
import neon from "../db"
import bcrypt, { compareSync } from 'bcrypt'
import { adminMiddleware } from "../middleware/admin"
import jwt from 'jsonwebtoken'





export const adminRouter=Router()
const jwtPassword=process.env.JWT_ADMIN_PASSWORD||'TREX9888'

interface AuthedRequest extends Request {
    userId?: string;
}


adminRouter.post("/create/ipo",adminMiddleware,async(req:AuthedRequest,res)=>{
    
    const {name,imageurl,priceBand,open,close,issueSize,listingDate,rhp,drhp,issueType,status}=req.body
    console.log(req.body)
    const parsedData = {
      name,
      imageurl,
      open: new Date(open),
      close: new Date(close),
      listingDate: new Date(listingDate),
      issueSize: parseInt(issueSize, 10),
      issueType,
      drhp,
      rhp,
      status,
      priceBand
    };

    console.log(parsedData)

    const query=`INSERT INTO  ipo_details 
        (name,imageurl,price_band,open,close,issue_size,listing_date,rhp,drhp,issue_type,status,admin_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        returning *
    `
    const values=[
        parsedData.name,
        parsedData.imageurl,
        parsedData.priceBand,
        parsedData.open,
        parsedData.close,
        parsedData.issueSize,
        parsedData.listingDate,
        parsedData.rhp,
        parsedData.drhp,
        parsedData.issueType,
        parsedData.status,
        req.userId]

    try {
        const result = await neon.query(query,values)
        console.log('ipo created',result.rows[0])
        res.status(200).json({
            message:"ipo created"
        })
    } catch (error) {
        console.error("Error creating the ipo :",error)
        res.status(400).json({
            message:"please enter the values carefully "
        })
    }
    


    
})


adminRouter.post('/signup',async(req,res )=>{
    const {name,email,password}=req.body

    const hashedpassword=bcrypt.hashSync(password,10)

    const query=`INSERT INTO admins
        (name,email,password) VALUES($1,$2,$3)
        RETURNING *
    `
    const values=[name,email,hashedpassword]

    try{
        const result=await neon.query(query,values)
        console.log("Admin created ",result.rows[0])

        res.status(200).json({
            message:"Admin created succesfully"
        })
    }catch(err){
        console.log(err)
        res.status(200).json({
            message:" please try again later "
        })
    }


})

adminRouter.get("/test",(req,res)=>{
    res.send("you got me")
})

adminRouter.post("/verify",adminMiddleware,async(req:AuthedRequest,res)=>{
    const user = await neon.query("SELECT * FROM admins WHERE id=$1",[req.userId])
    res.status(200).json({
        user:user
    })
})

adminRouter.get('/ipos',adminMiddleware,async(req:AuthedRequest,res)=>{
    try {
        const data= await neon.query("SELECT * FROM ipo_details WHERE admin_id=$1",[req.userId])
        res.status(200).json({
            ipos:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

adminRouter.post('/signin',async(req,res)=>{
    const {email,password}=req.body

    try {
        const result = await neon.query('SELECT * FROM admins WHERE email=$1',[email])
        const user =result.rows[0]
        if(!user){
            res.status(404).json({
                message: "user not found"
            })
            return
        }
        if (user){
            const check=compareSync(password,user.password)
            if(check){
                const token = jwt.sign({id:user.id},jwtPassword,{
                    expiresIn:'1w'
                })
                res.status(200).json({
                    message:"User Signed in ",
                    token:token
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"some error occured please try agian later"
        })
    }

})