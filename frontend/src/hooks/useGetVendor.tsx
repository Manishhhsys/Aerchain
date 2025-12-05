import axios from "axios"
import { useEffect, useState } from "react"

export const useGetVendor=()=>{
    const [data,setdata]=useState([])
    useEffect(()=>{
        const response=async ()=>{
            try{
                const res=await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/vendor/list`)
                if(res.status===200){
                    setdata(res.data.data)
                }
            }catch(e:any){
                console.log("error While Getting The vendor list",e)
            }

        }
        response()
    },[])
    return data
}