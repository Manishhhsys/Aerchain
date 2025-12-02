import { Router } from "express";
import { createRfp } from "../controller/create.controller";

const router:Router=Router();


router.post("/create-rfp",createRfp);

export default router