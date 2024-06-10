import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from './config/dbConnect.js'
import evRouter from './routes/device.route.js';
import requestRoute from "./routes/request.route.js";
import userRoute from "./routes/user.route.js";
dotenv.config();
connectDB();
const app = express()
app.use(express.json())

app.use(cors({
  origin: '*'
}
))
app.options('*', cors())
app.use(
  cors({
      credentials: true,   
      origin: true,
      allowedHeaders: "*"
  })
)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/v1/evtol/admin", evRouter);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})