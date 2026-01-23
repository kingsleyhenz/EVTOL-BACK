import express from 'express';
import evRouter from './device.route.ts';
import requestRoute from './request.route.ts';
import userRoute from './user.route.ts';
import messageRoute from './notification.route.ts';

const router = express.Router();

router.use('/evtol/admin', evRouter);
router.use('/request', requestRoute);
router.use('/user', userRoute);
router.use('/notification', messageRoute);

export default router;
