import express from 'express';
import RequestController from '../controller/request.controller.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", isLoggedIn, RequestController.makeRequest);
requestRoute.get("/all-requests", isLoggedIn, RequestController.getAllRequests);
requestRoute.get("/get/:requestId", isLoggedIn, RequestController.getRequestById);
requestRoute.get("/my-requests", isLoggedIn, RequestController.getMyRequests);
requestRoute.put("/accept/:requestId", isLoggedIn, RequestController.acceptRequest);

export default requestRoute;
