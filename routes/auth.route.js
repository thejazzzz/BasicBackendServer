import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller';


const authRouter = Router();

//path: /api/v1/auth/sign-up(POST)
authRouter.post('/sign-up', signUp);

//path: /api/v1/auth/sign-in
authRouter.post('/sign-in',signIn); 

//path: /api/v1/auth/sign-out   
authRouter.post('/sign-out',signOut);


export default authRouter;
