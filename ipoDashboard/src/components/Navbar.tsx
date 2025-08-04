
const Navbar = () => {
  if(window.location.pathname=='/authentication'){
    return(
      <div className='w-11/12 flex max-w-[1920px] items-center m-2 p-2 rounded-xl justify-between  bg-slate-300/40   mx-auto '>
      <div className='w-fit text-4xl font-bold text-blue-800 p-2 mx-2'>
        BlueStocks
      </div>
      <div className="hidden md:block">
         <div className=" list-none flex pr-6 "> 
          <li className=" p-2 m-2 text-gray-700">PRODUCTS</li>
          <li className=" p-2 m-2 text-gray-700">PRICING</li>
          <li className=" p-2 m-2 text-gray-700">COMMUNITY</li>
          <li className=" p-2 m-2 text-gray-700"> MEDIA</li>
          <li className=" p-2 m-2 text-gray-700">SUPPORT</li>

        </div>
      </div>
      
    </div>
    )

  }
  return (
    <div className='w-11/12 flex max-w-[1920px] items-center m-2 p-2 rounded-xl  bg-slate-300/40   mx-auto '>
      <div className='w-fit text-4xl font-bold text-blue-800 p-2 mx-2'>
        BlueStocks
      </div>
      <div className=" list-none hidden md:flex "> 
        <li className=" p-2 m-2 text-gray-700">PRODUCTS</li>
        <li className=" p-2 m-2 text-gray-700">PRICING</li>
        <li className=" p-2 m-2 lg:block hidden text-gray-700">COMMUNITY</li>
        <li className=" p-2 m-2 lg:block hidden text-gray-700"> MEDIA</li>
        <li className=" p-2 m-2 xl:block hidden text-gray-700">SUPPORT</li>

      </div>
      <div className="flex justify-end pr-4 items-center  flex-1/2">
        <div className="w-52">
          <button className=" p-2 mx-2">
            sigin
          </button>
          <button className="border border-black p-2 mx-2 text-xl text-white  bg-[#3F52FF]">
            signup now
          </button>
         
        </div>  
        <div className="w-6 ">
            <img className="w-full" src="./../../public/image.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar