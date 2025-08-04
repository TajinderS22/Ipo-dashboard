import { useState } from "react";
import Navbar from "../Navbar"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router";
import Footer from "../Footer";


type InputTypes={
  name:string,
  email:string,
  password:string
}

const Authentication = () => {

  const [isLogin,setIsLogin]=useState<boolean>(false)
  const navigate= useNavigate()

  const {
    register,
    handleSubmit
  }=useForm<InputTypes>()

  const onSubmit=async(data:InputTypes)=>{
    try {
      if(isLogin){
        const response= await axios.post("http://localhost:3000/admin/signin",data)
        if(response.status==200){
          localStorage.setItem('adminJwt',response?.data?.token)
          navigate('/panel')
        }
        return
      }
      const response=await axios.post("http://localhost:3000/admin/signup",data)
      console.log(response)
      if(response.status==200){
        alert("Signed up Now please login")
        setIsLogin(true)
      }

      
    } catch (error) {
      console.log(error)
    }


    
    
  }

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex items-center h-[70svh]">
        <div className="w-[300px] mx-auto bg-slate-300 p-4 rounded-lg ">
          <p className="text-2xl font-bold text-blue-800 m-2">
            BlueStocks
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pb-3" >
            {!isLogin&& <input className={inputBoxStyle} placeholder="Name" type="text" {...register("name",{required:" Plese enter your name"})} />}
            <input className={inputBoxStyle} placeholder="email" type="email" {...register('email',{required:"email is required"})} />
            <input className={inputBoxStyle} placeholder="********" type="password" {...register('password',{required:"password is required"})} />
            <div className="flex w-11/12 justify-end">
              <input type="submit"  className="bg-blue-600 p-2 mt-2  text-white font-semibold rounded-lg" />
            </div>
          </form>
          <div className="w-11/12 mx-auto pb-4 flex justify-between items-center border-t">
            <span className="text-blue-900">
              {isLogin?" Already registered ? ":" New to BlueStocks ? "}
            </span>
            <button onClick={()=>{
              setIsLogin(!isLogin)
            }}
            className="bg-blue-300 p-2
             m-2 rounded-lg"
            >{isLogin?"Signup ":"Signin"}</button>
          </div>


        </div>

      </div>
      <Footer/>
    </div>
  )
}

const inputBoxStyle='bg-blue-100 m-2 p-2 rounded-lg '

export default Authentication