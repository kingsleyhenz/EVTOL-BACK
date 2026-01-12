import express  from "express";
import {evtolRegister, getAllEvtols} from "../controller/device.controller.js";
// import {isLoggedIn} from "../middleware/isLoggedIn.js";
import storage from "../config/cloudconfig.js";
import multer from "multer";



const evRouter = express.Router();
const upload = multer({storage})    



evRouter.post('/Register', evtolRegister);
evRouter.get('/all', getAllEvtols);      






export default evRouter;