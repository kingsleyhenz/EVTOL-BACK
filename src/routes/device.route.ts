import express from "express";
import DeviceController from '../controller/device.controller.ts';
import storage from "../config/cloudconfig.ts";
import multer from "multer";

const evRouter = express.Router();
const upload = multer({ storage });

evRouter.post('/Register', DeviceController.registerDevice);
evRouter.get('/all', DeviceController.getAllDevices);
evRouter.get('/available', DeviceController.getAvailableDevices);

export default evRouter;
