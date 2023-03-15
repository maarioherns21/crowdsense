import express from "express"
const router = express.Router()
import {  createRestaurant, deleteRestaurant, index, updateRestaurant, upload } from "../controllers/restaurants";



router.get("/", index)

router.post("/add", upload.array('photo', 5), createRestaurant)

router.delete("/:id", deleteRestaurant)

router.patch("/:id", updateRestaurant)


export default router