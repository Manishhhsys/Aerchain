import { Router } from "express";
import { createRfp } from "../controller/create.controller";
import { sendrfpmail } from "../controller/sendrpfmail.controller";
import { comparevendor } from "../controller/comparevendor.controller";
import { getrfplist } from "../controller/getrfplist.controller";

const router:Router=Router();


router.post("/create-rfp",createRfp);
router.post("/:rfp_id/send",sendrfpmail)
router.get("/:rfp_id/compare",comparevendor)
router.get("/getrfp",getrfplist)

export default router