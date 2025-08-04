import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import type { IpoTypes } from './admin/Panel';
import IpoCard from './IpoCard';
import axios from 'axios';
import Footer from './Footer';
 




const Ipos = () => {

    const [ipos,setIpos]=useState<IpoTypes[]>([])

    const getAllIpos=async()=>{
        const response= await axios.get("http://localhost:3000/user/ipo")
        setIpos(response?.data?.ipos)
    }

    useEffect(()=>{
        getAllIpos()
    },[])
 
  return (
    <div className='w-screen mx-auto  max-w-[1920px]'>
        <Navbar/>
        <div className='w-11/12 mx-auto mt-6'>
            <div className='w-11/12 mx-auto'>
                <p className='text-3xl font-extrabold'>
                   Latest Ipos 
                </p>
                <p className='font-medium text-sm'>
                    Companies that have filled for an IPO with SEBI. Few details might be disclosed by the companies later.
                </p>
            </div>

            {/* ipo cards */}
            
            <div>
                <div className='flex w-11/12 mx-auto '>
                <div className='flex flex-wrap justify-around w-full '>
                  { ipos.map((ipo)=>(
                  <div key={ipo.id}>
                    <IpoCard 
                    name={ipo.name}
                    imageurl={ipo.imageurl} 
                    price_band={ipo.price_band} 
                    open={ipo.open} 
                    close={ipo.close} 
                    issue_size={ipo.issue_size} 
                    listing_date={ipo.listing_date} 
                    rhp={ipo.rhp} 
                    drhp={ipo.drhp} 
                    issue_type={ipo.issue_type} 
                    status={ipo.status} />
                  </div>
                ))}
              </div>
            </div>

            </div>

            
        </div>

        <Footer/>

    </div>
  );
};
 
export default Ipos;
