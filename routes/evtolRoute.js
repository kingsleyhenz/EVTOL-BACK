import express  from "express";
import { evtolRegister, loadEvtol } from "../controller/regAndLoad.js";

const evRouter = express.Router();

evRouter.post('/Register',evtolRegister)
evRouter.post('/Load/:id',loadEvtol)




export default evRouter;