import { useState } from "react";
import VendorList from "../components/vendorlist";
import { Button } from "../components/ui/button";
import { useGetVendor } from "../hooks/useGetVendor";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import VendorRespondedList from "../components/vendorRespondedList";
import { useGetVendorResponded } from "../hooks/useGetVendorResponded";


function RfpPage() {
    const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
    const vendors=useGetVendor()
    const {rfp_id}=useParams()
    const respondedVendors=useGetVendorResponded(rfp_id as string)
    const handleSubmit = async () => {
        const response=await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/rfp/${rfp_id}/send`,{
            vendors_ids:selectedVendorIds
        })
        if(response.status===200){
            console.log("email was Sent")//toast
        }
    };

    return (
        <div className="bg-background min-h-screen flex flex-col justify-start px-5 py-5">
            <div className="flex flex-col my-2">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Vendor List</div>
                    <div>
                        <Button className="mt-4 w-fit" onClick={handleSubmit}>
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
                    <Button>Recommended Vendor(Ai)</Button>
                </div>
            </div>
            <VendorRespondedList responded={respondedVendors} />
        </div>
    );
}

export default RfpPage;
