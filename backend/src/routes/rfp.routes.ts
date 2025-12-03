import { Router } from "express";
import { createRfp } from "../controller/create.controller";
import { sendrfpmail } from "../controller/sendrpfmail.controller";

const router:Router=Router();


router.post("/create-rfp",createRfp);
router.post("/:rfp_id/send",sendrfpmail)

export default router