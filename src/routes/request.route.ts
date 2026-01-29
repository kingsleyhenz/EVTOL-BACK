import express from 'express';
import RequestController from '../controller/request.controller.ts';
import { isLoggedIn } from '../middleware/isLoggedIn.ts';
import { validateDto } from '../middleware/validate.ts';
import { CreateRequestDto } from '../dto/request.dto.ts';

const requestRoute = express.Router();

requestRoute.post('/create', isLoggedIn, validateDto(CreateRequestDto), RequestController.makeRequest);
requestRoute.get('/all', isLoggedIn, RequestController.getAllRequests);
requestRoute.get('/my-requests', isLoggedIn, RequestController.getMyRequests);
requestRoute.get('/:requestId', isLoggedIn, RequestController.getRequestById);
requestRoute.patch('/:requestId/accept', isLoggedIn, RequestController.acceptRequest);

export default requestRoute;
