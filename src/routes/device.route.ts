import express from 'express';
import DeviceController from '../controller/device.controller.ts';
import { isLoggedIn } from '../middleware/isLoggedIn.ts';
import { validateDto } from '../middleware/validate.ts';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto.ts';

const evRouter = express.Router();

evRouter.post('/register', isLoggedIn, validateDto(CreateDeviceDto), DeviceController.registerDevice);
evRouter.get('/all', isLoggedIn, DeviceController.getAllDevices);
evRouter.get('/available', isLoggedIn, DeviceController.getAvailableDevices);
evRouter.get('/:deviceId', isLoggedIn, DeviceController.getDeviceById);
evRouter.put('/:deviceId', isLoggedIn, validateDto(UpdateDeviceDto), DeviceController.updateDevice);
evRouter.delete('/:deviceId', isLoggedIn, DeviceController.deleteDevice);

export default evRouter;
