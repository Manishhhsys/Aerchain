import { useState } from "react";
import VendorList from "../components/vendorlist";
import { Button } from "../components/ui/button";
import { useGetVendor } from "../hooks/useGetVendor";
import { useParams } from "react-router-dom";
import axios from "axios";
import VendorRespondedList from "../components/vendorrespondedlist";
import { useGetVendorResponded } from "../hooks/useGetVendorResponded";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";

interface AIVendor {
    vendor_id: string;
    vendor_name: string;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    score: number;
}

interface AIRecommendedVendor {
    vendor_id: string;
    vendor_name: string;
    reason: string;
}

interface AIResponse {
    vendors: AIVendor[];
    comparison_overview: string;
    recommended_vendor: AIRecommendedVendor;
}



function RfpPage() {
    const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
    const [isdisable,setdisable]=useState<Boolean>(false)
    const [aiData, setaiData] = useState<AIResponse | null>(null)
    const vendors = useGetVendor()
    const { rfp_id } = useParams()
    const respondedVendors = useGetVendorResponded(rfp_id as string)
    const handleSubmit = async () => {
        if(selectedVendorIds.length===0){
            toast.error("Please Select the Vendor From The List")
            return
        }
        try{
            setdisable(true)
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/${rfp_id}/send`, {
            vendors_ids: selectedVendorIds
        })
        if (response.status === 200) {
            toast.success(response.data.message)
        }
        }catch(e:any){
            toast.error(e.response.data.message)
        }finally{
            setdisable(false);
        }
    };
    const getcompareinfo = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/${rfp_id}/compare`)
        if (response.status === 200) {
            setaiData(response.data.data)
        }
        }catch(e:any){
            toast.error(e.response.data.message)
        }   
    }
    return (
        <div className="bg-background min-h-screen flex flex-col justify-start px-5 py-5">
            <div className="flex flex-col my-2">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Vendor List</div>
                    <div>
                        <Button className="mt-4 w-fit" onClick={handleSubmit} disabled={isdisable as boolean}>
                            Send RFP to Selected Vendors
                        </Button>
                    </div>

                </div>

            </div>

            <div className="h-[300px] border rounded-lg overflow-auto">
                <VendorList
                    vendors={vendors}
                    onSelectionChange={setSelectedVendorIds}
                />
            </div>
            <div className="mt-5 flex items-center justify-between">
                <div className="text-xl font-semibold">
                    Vendor Responded
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={getcompareinfo}>Recommended Vendor (AI)</Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">
                                    AI Recommended Vendor
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground">
                                    Based on pricing, requirements match, delivery timelines & proposal quality.
                                </p>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                                {aiData?.vendors.map((vendor) => (
                                    <div
                                        key={vendor.vendor_id}
                                        className="border rounded-lg p-4 bg-muted/30"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">{vendor.vendor_name}</h3>
                                            <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-md font-semibold">
                                                Score: {vendor.score}
                                            </span>
                                        </div>

                                        <p className="text-sm mt-2">{vendor.summary}</p>

                                        <div className="mt-3">
                                            <h4 className="font-medium">Strengths:</h4>
                                            <ul className="list-disc list-inside text-sm text-green-600">
                                                {vendor.strengths.map((s, i) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-2">
                                            <h4 className="font-medium">Weaknesses:</h4>
                                            <ul className="list-disc list-inside text-sm text-red-600">
                                                {vendor.weaknesses.map((w, i) => (
                                                    <li key={i}>{w}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 border rounded-lg bg-card">
                                <h3 className="text-lg font-semibold">Comparison Overview</h3>
                                <p className="text-sm mt-2 text-muted-foreground">
                                    {aiData?.comparison_overview}
                                </p>
                            </div>

                            <div className="mt-6 p-4 border rounded-lg bg-primary/10">
                                <h3 className="text-lg font-bold text-primary">Recommended Vendor</h3>

                                <p className="font-medium mt-2">
                                    {aiData?.recommended_vendor.vendor_name}
                                </p>

                                <p className="text-sm text-muted-foreground mt-1">
                                    {aiData?.recommended_vendor.reason}
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <VendorRespondedList responded={respondedVendors} />
        </div>
    );
}

export default RfpPage;
