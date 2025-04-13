import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.route.js';    
import subscriptionRouter from './routes/subcription.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDB from './database/mangodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';





const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);
app.listen(PORT, async()  => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDB();
}
);
export default app;