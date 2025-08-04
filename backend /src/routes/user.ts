import { Router } from "express";
import neon from "../db";

export const userRouter= Router()


userRouter.get('/ipo',async(req,res)=>{
    const result=await neon.query('SELECT * FROM  ipo_details')
    console.log(result.rows)
    res.json({
        ipos:result.rows
    })
})