import express from 'express';
import { acceptRequest, makeRequest } from './../controller/request.controller.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", makeRequest);
requestRoute.put("/accept/:requestId", acceptRequest);

export default requestRoute;