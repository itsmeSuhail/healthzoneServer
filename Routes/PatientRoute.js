import express  from "express";
const Router=express.Router();
import multer from "multer";

import { addPatient, deletePatient, getAllPatients, getPatient, updatePatient } from "../Controller/PatientController.js";

//multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//multer middleware


//Routes
Router.post("/add", upload.single("image"), addPatient);
Router.get("/getAll",getAllPatients )
Router.get("/get/:id",getPatient)
Router.delete("/delete/:id",deletePatient );
Router.put("/update/:id",updatePatient )
//routes
export default Router;