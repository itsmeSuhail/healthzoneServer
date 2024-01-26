import express  from "express";
import { getImage } from "../Controller/ImageController.js";
const Router=express.Router();

//Routes
Router.get("/get/:id", getImage);
//Routes

export default Router;