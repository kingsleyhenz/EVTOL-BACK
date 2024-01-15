import express from 'express';
import { makeRequest } from './../controller/request.controller.js';

const requestRoute = express.Router();

requestRoute.post("/send-request", makeRequest);

export default requestRoute;