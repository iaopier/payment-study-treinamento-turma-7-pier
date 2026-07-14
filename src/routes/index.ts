import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
router.post('/auth/login', UserController.login);
export default router;