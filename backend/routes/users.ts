import express, { Router } from "express"
// import { createBar, deleteBar, getAllBars, updateBar } from "../controllers/bars"
const router: Router = express.Router()
import multer from "multer"
import { upload } from "../controllers/restaurants"
import { createUser, deleteUser, index, updateUser } from "../controllers/users"

router.get("/", index )

router.post("/add", upload.single("photo"), createUser )

router.delete("/:id" , deleteUser )

router.patch("/:id", updateUser )


export default router