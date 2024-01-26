import express from "express";
import cors from "cors"
import { mysqlInstance } from "./model/databse/mysql.config.js"
import cacheController from "./utility/cache.config.js";
import compression from "compression";
import rateLimiterMiddleware from "./utility/rateLimiter.js";
import cluster from "cluster";
import HospitalRoute from "./Routes/HospitalRoute.js"
import PsychiatristRoute from "./Routes/Psychiatrist.js"
import PatientRoute from "./Routes/PatientRoute.js"
import ImagesRoute from "./Routes/ImageRoute.js"
import os from "os";

const PORT = process.env.PORT || 3001;
const app = express();
const cache = apicache.middleware;
app.use(cors())
app.use(express.json());
app.use(cacheController)
app.use(compression({
  level: 6,
  threshold: 5 * 100
}))
app.use(rateLimiterMiddleware);
const cpu = os.cpus().length;
const db = await mysqlInstance.connection();
const attachDbMiddleware = (req, res, next) => {
  req.db = db; 
  next();
};

// db middleware for all routes
app.use(attachDbMiddleware);
app.use("/api/v1/hospital", HospitalRoute);
app.use("/api/v1/pyschiatrist", PsychiatristRoute);
app.use("/api/v1/patient", PatientRoute);
app.use("/api/v1/image", ImagesRoute);



if (cluster.isMaster) {
  for (let i = 0; i < cpu && i < 10; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signla) => {
    cluster.fork();
  })
}
else {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })

}
// app.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// })

