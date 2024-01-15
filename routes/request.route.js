import express from 'express';
import { acceptRequest, declineRequest, makeRequest } from './../controller/request.controller.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", makeRequest);
requestRoute.put("/accept/:requestId", acceptRequest);
requestRoute.put("/decline/:requestId", declineRequest);

export default requestRoute;