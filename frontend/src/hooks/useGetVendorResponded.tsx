import axios from "axios";
import { useState,useEffect } from "react";

export const useGetVendorResponded=(rfp_id:string)=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        const res=async()=>{
            const response=await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/${rfp_id}/received`)
            if(response.status===200){
                setdata(response.data.data)
                return
            }
        }
        res()
    },[])
    return data
}