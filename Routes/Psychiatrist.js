import express from "express";
const Router = express.Router();

import { addPsychiatrist, deletePsychiatrist, getAllPsychiatrist, getPsychiatris, psychiatristDetailsById, updatePschiatrist } from "../Controller/PsychiatristController.js";

//Routes
Router.post("/add",addPsychiatrist )
Router.get("/details/:id",psychiatristDetailsById )
Router.get("/getAll",getAllPsychiatrist)
Router.get("/get/:id",getPsychiatris)
Router.delete("/delete/:id",deletePsychiatrist);
Router.put("/update/:id", updatePschiatrist)
//Routes

export default Router;