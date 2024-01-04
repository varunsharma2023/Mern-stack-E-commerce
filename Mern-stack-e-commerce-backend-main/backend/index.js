import express from "express";
import dotenv from "dotenv";
import Connect from "../backend/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryroute from './routes/categoryroute.js'
import productroute from './routes/productroute.js'
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
dotenv.config();
Connect();
//rest api

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryroute);
app.use('/api/v1/product', productroute);
app.get('/', (req, res) => {
  res.send('<h1>welcome</h1>');
});
const PORT = process.env.PORT || 6010;
app.listen(PORT, () => {
  console.log(`server running on ${PORT} `);
});