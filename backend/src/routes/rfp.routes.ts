import { Router } from "express";
import { createRfp } from "../controller/create.controller";

const router:Router=Router();


router.post("/",createRfp);

export default router