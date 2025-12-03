import { Router } from "express";
import { getvendorlist } from "../controller/getvendor.controller";

const router:Router=Router()


router.get("/list",getvendorlist)

export default router