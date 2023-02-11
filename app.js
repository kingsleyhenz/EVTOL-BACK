import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from './config/dbConnect.js'
import evRouter from "./routes/evtolRoute.js";
dotenv.config();
connectDB();
const app = express()
app.use(express.json())

app.use(cors())

app.use("/api/v1/evtol/admin", evRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT,console.log(`Server is running at ${PORT}`))