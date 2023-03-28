import express from "express";
import {
  countByCity,
  countByType,
  createDrone,
  deleteDrone,
  getDrone,
  getDrones,
  updateDrone,
} from "../controllers/drone.js";
import Drone from "../models/Drone.js";
const router = express.Router();

//CREATE
router.post("/", createDrone);

//UPDATE
router.put("/:id", updateDrone);
//DELETE
router.delete("/:id", deleteDrone);
//GET

router.get("/find/:id", getDrone);
//GET ALL

router.get("/", getDrones);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;
