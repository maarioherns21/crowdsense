import express, { Router } from "express"
import { createBar, deleteBar, getAllBars, updateBar } from "../controllers/bars"
const router: Router = express.Router()


router.get("/" , getAllBars)

router.post("/:add", createBar)

router.delete("/:id" , deleteBar)

router.patch("/:id", updateBar)


export default router