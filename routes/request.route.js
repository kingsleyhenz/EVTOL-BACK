import express from 'express';
import { acceptRequest, cancelRequest, declineRequest, deliverRequest, getAllRequests, makeRequest, deployDevice, getRequestById } from './../controller/request.controller.js';
import { isLoggedIn } from './../middleware/isLoggedIn.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", isLoggedIn, makeRequest);

requestRoute.get("/all-requests", getAllRequests);

requestRoute.get("/get/:requestId", getRequestById);

requestRoute.put("/accept/:requestId", acceptRequest);

requestRoute.put("/decline/:requestId", declineRequest);

requestRoute.put("/cancel/:requestId", cancelRequest);

requestRoute.put("/deploy/:requestId", deployDevice);

requestRoute.put("/delivered/:requestId", deliverRequest);

export default requestRoute;