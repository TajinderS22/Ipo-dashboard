import express from "express"
import neon from './db'
import { Router } from "express";
import { adminRouter } from "./routes/admin";
import { userRouter } from "./routes/user";
import cors from 'cors'



const app = express()
const port =3000;

app.use(express.json())

app.use(cors())

const router = express.Router()
app.use(router)

router.use('/admin',adminRouter)
router.use('/user',userRouter)

app.listen(port,()=>{
    console.log("Server is live at port "+port +".")
})