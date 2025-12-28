import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './configs/db.js';
import bookRouter from './routes/bookRoutes.js';
import authorRouter from './routes/authorRoutes.js';
import categoryRouter from './routes/CategoryRoutes.js';

dotenv.config();

const app = express();

app.use(cors(
    {origin: "http://localhost:5173"}
));

app.use(express.json());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/categories", categoryRouter)

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server đang chạy ở cổng 3000")
    })}
)
