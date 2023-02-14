import express  from "express";
import { evtolRegister, loadEvtol } from "../controller/regAndLoad.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import { batteryLevel, checkAvailableEVTOL, checkLoadForParticularEV, getAllEvtols } from "../controller/evtolInfo.js";



const evRouter = express.Router();

evRouter.post('/Register', evtolRegister)   //WORKING
evRouter.post('/Load/:serialNo', loadEvtol)       //WORKING
evRouter.get('/all', getAllEvtols)       //WORKING
evRouter.get('/checkLoad/:id',checkLoadForParticularEV) //WORKING
evRouter.get('/availableEV', checkAvailableEVTOL)       //WORKING
evRouter.get('/batterylevel/:id', batteryLevel)        //WORKING







export default evRouter;