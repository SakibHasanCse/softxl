import express from 'express';
import { validatorhandler } from '../middlewares/appMid';
import { userRagister ,userLogin ,userProfile} from './../controllers/user';
import user from '../model/validation/user';
import login from '../model/validation/login';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router
    .route('/ragister')
    .post(validatorhandler(user),userRagister)

router
    .route('/login')
    .post(validatorhandler(login), userLogin)
   
router
    .route('/profile')
    .get(isAuth, userProfile)
   

export default router
