import { LucidePlus } from "lucide-react"
import { Button } from "./ui/button"
import Rfpcard from "./rfpcard"
import { useGetRfp } from "../hooks/useGetRfp"
import { Dialog, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { DialogClose, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface RfpData {
  id: string;
  raw_text: string;
}

async function createrfp(data:any){
    try{
        const response=await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/create-rfp/`,data)
        if(response.status===201){
            console.log("Succes")//toast
            return response
        }
    }
    catch(e:any){
        console.log("Error in create Rfp",e)
    }
}

function Dashboard() {
  const data = useGetRfp() as RfpData[]
  const form=useForm()
  const navigate = useNavigate();
  const [open,setopen]=useState(false)
  const handleCardClick = (id: string) => {
    navigate(`/rfp/${id}`);
  };

  const onSubmit=async (data:any)=>{
    const response = await createrfp(data);
    if (response){
        setopen(false)
        form.reset()
    }
  }
  return (
    <div className="bg-background min-h-screen grid grid-cols-[15%_85%]">
      <div className="bg-foreground px-5 py-5 flex justify-start">
        <Dialog open={open} onOpenChange={setopen}>
            
                <DialogTrigger asChild  onClick={() => setopen(true)}>
                    <Button size={"lg"}><LucidePlus></LucidePlus>New RFP</Button>
                </DialogTrigger>
                 <DialogContent className="max-w-none overflow-y-auto">
                        <DialogHeader >
                            <DialogTitle>Create A New Requests for Proposal</DialogTitle>
                        </DialogHeader>
                    <Form {...form}>   
                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({field})=>(
                    <FormItem>
                        <FormLabel>Enter Name Of the Rfp</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the Name" type="text" {...field}></Input>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="raw_text" render={({field})=>(
                    <FormItem>
                        <FormLabel>Enter The Details of RFP</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter the Details Of the Requests for Proposal"{...field}></Textarea>
                        </FormControl>
                    </FormItem>
                )}/>
                <DialogFooter>
                     <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
                </DialogFooter>
                </form>
            </Form> 
            </DialogContent>
        </Dialog>
        
      </div>
        <div className="px-5 py-5 flex flex-col gap-5">
            <div className="text-2xl font-bold">
                Requests for Proposal
            </div>
            <div className="grid grid-cols-3 gap-3">       
                {(data.length===0)?(
                    <div>No Requests for Proposal Is Created</div>
                ):
                (data.map((content)=>(
                    <Rfpcard key={content.id} raw_text={content.raw_text} id={content.id} onClick={() => handleCardClick(content.id)}></Rfpcard>
                )))
                }
            </div>
                
        </div>
    </div>
  )
}

export default Dashboard
