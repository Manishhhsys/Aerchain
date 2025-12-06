import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "sonner";

export const useGetVendorResponded=(rfp_id:string)=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        let ismounted=true
        const fetchdata=async ()=>{
             try{
            const response=await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/${rfp_id}/received`)
            if (!ismounted) return;
            if(response.status===200){
                setdata(response.data.data)
                return
            }
            toast.error(response.data.message)
        }catch(e:any){
            toast.error(
          e?.response?.data?.message || "Error fetching responded vendors"
        );
        }
        }
       fetchdata();
       const interval=setInterval(fetchdata,15000);
       return ()=>{
        ismounted = false;
       clearInterval(interval);
       }
    },[rfp_id])
    return data
}