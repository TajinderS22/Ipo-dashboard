import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminNavbar from './AdminNavbar';
import { useModal } from '../utils/useModal';
import CreateIpoModel from './CreateIpoModel';
import IpoCard from '../IpoCard';
import Footer from '../Footer';




export type IpoTypes={
    id?:number,
    name?:string,
    imageurl?:string,
    price_band?:string,
    open:Date,
    close:Date,
    issue_size:number,
    listing_date:Date,
    rhp:string,
    drhp:string,
    issue_type:string,
    status:string,
    admin_id?:number,


}







const Panel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("adminJwt"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {isOpen}=useModal()
  // const [ipos,setIpos]=useState(null)

  const isSessionActive = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/verify",
        {},
        {
          headers: {
            authorization: jwt ,
          }
        }
      );

      if (response.status !== 200) {
        navigate("/authentication");
      } else {
        setUser(response.data.user);
        getAllCreatedIpos()
      }
    } catch (error) {
      console.log(error)
      navigate("/authentication");
    }
  };
  
  const [ipos,setIpos]=useState<IpoTypes[]>([])

  useEffect(() => {
    if (jwt && !user) {
      isSessionActive();
    }
    if (!jwt && user) {
      setUser(null);
      navigate('/authentication');
    }
    if (!jwt) {
      navigate('/authentication');
    }
  }, [jwt, user, navigate,isOpen]);

  const getAllCreatedIpos=async()=>{
    const result= await axios.get("http://localhost:3000/admin/ipos",{headers:{
      authorization:jwt
    }})
    setIpos(result?.data?.ipos?.rows)
    console.log(result?.data?.ipos?.rows)
  }

  return (
      <div className='max-w-[1920px] w-screen mx-auto -z-10'>
        <div className=' fixed bg-black/10 w-full backdrop-blur-sm max-w-[1920px] mx-auto'>
          {isOpen && <CreateIpoModel/>}
        </div>
        <div className='min-h-screen'>
          <AdminNavbar/>
          <div className='w-11/12 mx-auto ' >
            <p className='text-3xl font-bold'>
              Available Ipos
            </p>
            <div className='flex flex-wrap w-10/12 mx-auto '>
              <div className='flex flex-wrap w-full '>
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

          {/* footer */}

          <Footer/>

        </div>
      </div>
  );
};

export default Panel;
