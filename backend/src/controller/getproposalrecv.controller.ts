import { Request, Response } from "express";
import { StatusCode } from "../schema/statuscode.enum";
import prisma from "../utils/prisma.client";
import { StatusNum } from "@prisma/client";

export const getproposalrecv = async (req: Request, res: Response) => {
    try {
        const rfp_id = req.params.rfp_id;
        if (!rfp_id) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Rfp Id is Missing"
            })
        }
        const response = await prisma.sent_rfps.findMany({
            where: {
                rfp_id: rfp_id,
                status: StatusNum.RESPONDED
            },
            select: {
                vendor_id: true,
                rfp_id: true,
                vendor: {
                    select: {
                        name: true,
                        company: true
                    }
                }
            }
        })
        if (response.length === 0) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "No Vendor Have Responded Yet"
            })
        }
        return res.status(StatusCode.OK).json({
            message: "Success",
            data: response
        })
    } catch (e: any) {
        console.log("Internal Error While Fetching the Vendor Proposal received", e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error While Fetching the Vendor Proposal received"
        })
    }
}