import express  from "express";
const Router=express.Router();

import { addHospital, deleteHospital, getAllHospitals, getHospital, hospitalDetailsById, updateHospital } from "../Controller/HospitalController.js";
//Routes
  Router.post("/add",addHospital )
  Router.get("/details/:id",hospitalDetailsById )
  Router.get("/getAll",getAllHospitals)
  Router.get("/get/:id",getHospital )
  Router.delete("/delete/:id",deleteHospital );
  Router.put("/update/:id", updateHospital)
//Routes

  export default Router;