import express  from "express";
import { evtolRegister, loadEvtol } from "../controller/regAndLoad.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import { batteryLevel, checkAvailableEVTOL, checkLoadForParticularEV, getAllEvtols } from "../controller/evtolInfo.js";



const evRouter = express.Router();

evRouter.post('/Register', evtolRegister)   
evRouter.post('/Load/:serialNo', loadEvtol)       
evRouter.get('/all', getAllEvtols)       
evRouter.get('/checkLoad/:id',checkLoadForParticularEV) 
evRouter.get('/availableEV', checkAvailableEVTOL)       
evRouter.get('/batterylevel/:id', batteryLevel)       







export default evRouter;