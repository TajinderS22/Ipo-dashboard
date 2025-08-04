import { useEffect, useState } from "react"
import type { IpoTypes } from "./admin/Panel"


const IpoCard = (props:IpoTypes) => {

  const isPanel=window.location.pathname
  const [isadmin,setIsadmin]=useState(false)

  useEffect(()=>{
    if(isPanel=='/panel'){
    setIsadmin(true)
  }
  },[isPanel])

  const {
    name,
    imageurl,
    price_band,
    open,
    close,
    issue_size,
    listing_date,
    rhp,
    drhp,
    issue_type,
    status,
  }=(props)
  let priceBand;
  if(price_band==null){
    priceBand='not set'
  }else{
    priceBand=price_band
  }
  const openDate= new Date( open).toLocaleDateString()
  const closeDate= new Date(close).toLocaleDateString()
  const listingDate= new Date(listing_date).toLocaleDateString()
  const issueSize= issue_size.toString()

  type statusStyleType={
    upcoming:string,
    closed:string,
    open:string

  }
  const statusStyle:statusStyleType={
    upcoming:"bg-yellow-300",
    closed:"bg-red-300",
    open:"bg-green-300"
  }
  const color = statusStyle[status as keyof statusStyleType];

  return (
    <div  className={`bg-gray-200 w-[400px] m-6   p-2 rounded-2xl`} >
      <div className="flex justify-end absolute -translate-y-2 w-[390px]">

        <div className={color+" p-2 -z-10 rounded-tr-xl shadow-xl rounded-bl-md"}>
          {status}
        </div>
      </div>
      <div className="flex m-2 ">
        <div className=" text-2xl font-semibold">
          {name}
        </div>
        <div className="w-8/12 ml-4 mt-1 h-12">
          <img className="max-h-16" src={imageurl} alt="" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >Price Band</p>
          <div className=" text-lg font-semibold ">{priceBand}</div>
        </div>
        <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >open</p>
          <div className=" text-lg font-semibold ">{openDate}</div>
        </div>
                <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >close</p>
          <div className=" text-lg font-semibold ">{closeDate}</div>
        </div>
      </div>

      {/* 3rd part */}
      <div className="flex justify-between">
        <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >Issue type</p>
          <div className=" text-lg font-semibold ">{issue_type}</div>
        </div>
        <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >Issue Size</p>
          <div className=" text-lg font-semibold ">{issueSize}</div>
        </div>
                <div className="flex flex-col  items-start m-2 p-2 ">
          <p className="text-lg font-light" >Listing Date</p>
          <div className=" text-lg font-semibold ">{listingDate}</div>
        </div>
      </div>  
              {/*  External link buttons
                */}

      <div className=" flex">
        <a href={rhp} >
            <div className=" w-18 text-center border border-blue-700 bg-blue-50 hover:bg-blue-300 p-2 m-2 rounded-lg" >
                rhp
            </div>
        </a>

        <a href={drhp} >
            <div className=" w-18 text-center bg-red-400 p-2 m-2 rounded-lg" >
                drhp
            </div>
        </a>


      </div>

     {
      isadmin&&
       <div className="flex justify-end p-2">

        <button className="bg-emerald-300 p-2 w-24 mx-2 rounded-lg">
          Edit
        </button>

      </div>
     }


    </div>
  )
}

export default IpoCard