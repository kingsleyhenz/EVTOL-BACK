import express from 'express';
import { acceptRequest, cancelRequest, deliverRequest, getAllRequests, makeRequest, deployDevice, getRequestById, getMyRequests, declineRequestDueToWeight, declineRequestDueToUnavailability } from './../controller/request.controller.js';
import { isLoggedIn } from './../middleware/isLoggedIn.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", isLoggedIn, makeRequest);

requestRoute.get("/all-requests", isLoggedIn, getAllRequests);

requestRoute.get("/get/:requestId", isLoggedIn, getRequestById);

requestRoute.get("/my-requests", isLoggedIn, getMyRequests)

requestRoute.put("/accept/:requestId", isLoggedIn, acceptRequest);

requestRoute.put("/decline/:requestId", isLoggedIn, declineRequestDueToWeight);

requestRoute.put("/decline-ii/:requestId", isLoggedIn, declineRequestDueToUnavailability);

requestRoute.put("/cancel/:requestId", isLoggedIn, cancelRequest);

requestRoute.put("/deploy/:requestId", isLoggedIn, deployDevice);

requestRoute.put("/delivered/:requestId", isLoggedIn, deliverRequest);

export default requestRoute;