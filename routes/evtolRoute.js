import express  from "express";
import { evtolRegister, loadEvtol } from "../controller/regAndLoad.js";

const evRouter = express.Router();

evRouter.post('/Register',evtolRegister)
evRouter.post('/Load',loadEvtol)




export default evRouter;