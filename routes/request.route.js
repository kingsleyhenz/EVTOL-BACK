import express from 'express';
import { acceptRequest, cancelRequest, declineRequest, deliverRequest, getAllRequests, makeRequest, deployDevice } from './../controller/request.controller.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", makeRequest);

requestRoute.get("/all-requests", getAllRequests);

requestRoute.put("/accept/:requestId", acceptRequest);

requestRoute.put("/decline/:requestId", declineRequest);

requestRoute.put("/cancel/:requestId", cancelRequest);

requestRoute.put("/deploy/:requestId", deployDevice);

requestRoute.put("/delivered/:requestId", deliverRequest);

export default requestRoute;