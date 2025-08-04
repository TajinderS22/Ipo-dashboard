import {useForm} from 'react-hook-form'
import { useModal } from '../utils/useModal'
import type { FormType } from '../utils/Types'
import axios from 'axios'



const CreateIpoModel = () => {
    const jwt=localStorage.getItem('adminJwt')
    const {
        register,
        handleSubmit,
    }=useForm<FormType>()


    const onSubmit=async(data:FormType)=>{
        console.log(data)
        const response = await axios.post('http://localhost:3000/admin/create/ipo',data,{
            headers:{
                authorization:jwt
            }
        })



        if(response.status==200){
            closeModal()
        }
    }

    const {closeModal}=useModal()

  return (
    <div className='min-h-screen w-full  flex justify-center items-center mx-auto z-50 '>
        <div className=' bg-stone-300 p-4 rounded-lg '>
            <div className='w-full flex justify-end'>
                <button
                    onClick={()=>{
                        closeModal()
                    }}
                className='bg-red-400  p-2 mt-2 rounded-xl'>
                    close
                </button>
                
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex ' >
                <div className='flex flex-col m-4'>
                    <input className={inputStyle} placeholder='name' type="text" {...register("name",{required:"name is Required"})} />
                    <label className='ml-4' htmlFor="listingDate">ListingDate</label>
                    <input className={inputStyle}  type="date" {...register("listingDate",{required:" "})} />
                    <label className='ml-4' htmlFor="open">Open</label>
                    <input className={inputStyle} type="date" {...register("open")} />
                    <label className='ml-4' htmlFor="close">Close</label>
                    <input className={inputStyle}   type="date" {...register("close")} />
                    <input className={inputStyle}  type="text" placeholder='Issue Size' {...register("issueSize")}/>

                </div>
                <div className='flex flex-col m-4'>   
                    <input className={inputStyle} placeholder='rhp' type="text" {...register("rhp",)} />
                    <input className={inputStyle} placeholder='imagurl' type="text" {...register("imageurl",)} />
                    <input className={inputStyle}  placeholder='drhp' type="text" {...register("drhp")} />
                    <input className={inputStyle}  placeholder='issueType' type="text" {...register("issueType")} />
                    <select className={inputStyle} {...register('status')} >
                        <option value="upcoming">Upcoming</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                    <input type="text" className={inputStyle +" mt-6 "} placeholder='Price Band' {...register("priceBand")} />
                    <input type="submit" className='bg-stone-500 w-11/12 mx-auto p-2 m-4 mt-7 rounded-xl' />
                </div>
            </form>

        </div>

    </div>
  )
}

const inputStyle='bg-slate-200 p-2 m-2 rounded-lg'

export default CreateIpoModel