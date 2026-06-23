import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import cookieParser from 'cookie-parser';
import { mongooseConnection } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import consultationRoutes from "./routes/consultation.route.js";
import categoryRoutes from "./routes/category.route.js";
const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
app.use(morgan('combined'));
app.use(cookieParser());

//Database Connection
mongooseConnection()

//Api Endpoints
app.use('/', express.static(path.join(process.cwd(), 'public')))
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/messages', consultationRoutes);
app.use('/api/category', categoryRoutes);



export default app;