import express from 'express';
import ClassController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionController';

const classController = new ClassController;
const connectionController = new ConnectionController;

const router = express.Router();

router.post('/classes', classController.create);
router.get('/classes', classController.index);

router.post('/connections', connectionController.create);
router.get('/connections', connectionController.index);

export default router;