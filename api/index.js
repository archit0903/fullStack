import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(function() {
  console.log('Connected to MongoDB!!');
}).catch(function(err) {  console.error(err); });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({ 
    message,
    statusCode: statusCode,
    success: false,
  });
});