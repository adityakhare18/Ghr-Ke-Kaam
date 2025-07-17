import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';


import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import dashboardRoutes from './routes/dashboard.js';
import bookingRoutes from './routes/bookings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/bookings', bookingRoutes);


app.get('/', (req, res) => {
    res.redirect('/auth/login');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});