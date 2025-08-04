import { useModal } from "../utils/useModal"

const AdminNavbar = () => {
    const {openModal}=useModal()
  return (
    <div className='w-11/12 flex max-w-[1920px] items-center m-2 p-2 rounded-xl  bg-slate-300/40   mx-auto '>
      <div className='w-fit text-4xl font-bold text-blue-800 p-2 mx-2'>
        BlueStocks
      </div>

      <div className="flex justify-end pr-4 items-center  flex-1/2">
        <button className="bg-cyan-300/60 p-2 m-2 rounded-2xl px-4 font-bold" onClick={()=>{
            openModal()
        }}>
            Create New 
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar