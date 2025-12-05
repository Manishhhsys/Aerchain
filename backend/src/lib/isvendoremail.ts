import prisma from "../utils/prisma.client"

export const isvendoremail=async (email:string)=>{
    const response=await prisma.vendors.findUnique({
        where:{
            email:email
        }
    })
    return response
}