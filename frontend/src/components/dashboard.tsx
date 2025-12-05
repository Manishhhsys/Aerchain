import { LucidePlus } from "lucide-react"
import { Button } from "./ui/button"
import Rfpcard from "./rfpcard"
import { useGetRfp } from "../hooks/useGetRfp"


interface RfpData {
  id: string;
  raw_text: string;
}

function Dashboard() {
  const data = useGetRfp() as RfpData[]
  return (
    <div className="bg-background min-h-screen grid grid-cols-[15%_85%]">
      <div className="bg-foreground px-5 py-5 flex justify-start">
        <Button size={"lg"}><LucidePlus></LucidePlus>New RFP</Button>
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
                    <Rfpcard key={content.id} raw_text={content.raw_text}></Rfpcard>
                )))
                }
            </div>
                
        </div>
    </div>
  )
}

export default Dashboard
