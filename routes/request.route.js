import express from 'express';
import { acceptRequest, cancelRequest, declineRequest, makeRequest } from './../controller/request.controller.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", makeRequest);
requestRoute.put("/accept/:requestId", acceptRequest);
requestRoute.put("/decline/:requestId", declineRequest);
requestRoute.put("/cancel/:requestId", cancelRequest);

export default requestRoute;