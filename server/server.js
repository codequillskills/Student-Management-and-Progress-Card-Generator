import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConn from "./src/utils/db.js";
import userRoute from "./src/routes/user.route.js";
import reportRoute from "./src/routes/report.route.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// Update CORS configuration
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoute);
app.use('/api/report', reportRoute);

dbConn();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});