import express  from "express";
import { evtolRegister, loadEvtol, medImageUpload } from "../controller/regAndLoad.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import { batteryLevel, checkAvailableEVTOL, getAllEvtols, getUserMedications } from "../controller/evtolInfo.js";
import storage from "../config/cloudconfig.js";
import multer from "multer";



const evRouter = express.Router();
const upload = multer({storage})    



evRouter.post('/Register', evtolRegister)   
evRouter.post('/Load/:serialNo', loadEvtol)     
evRouter.post('/UploadImage/:name',upload.single("profile"), medImageUpload)  
evRouter.get('/all', getAllEvtols)       
evRouter.get('/checkMeds',getUserMedications) 
evRouter.get('/availableEV', checkAvailableEVTOL)       
evRouter.get('/batterylevel/:id', batteryLevel)       






export default evRouter;