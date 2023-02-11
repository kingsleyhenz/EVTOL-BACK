import express  from "express";
import { evtolRegister } from "../controller/regAndLoad.js";

const evRouter = express.Router();

evRouter.post('/Register',evtolRegister)



export default evRouter;