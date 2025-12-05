import { useEffect, useState } from "react"
import axios from "axios"

export const useGetRfp = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/getrfp`)
                if (res.status == 200) {
                    setdata(res.data.data)
                    return
                }
            } catch (e: any) {
                console.log(e)
            }
        }
        getdata();
    }, [])
    return data
}