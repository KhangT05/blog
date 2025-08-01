require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
const port = process.env.PORT || 5000;
const pool = require('./src/config/database');
const initRouter = require('./src/router/index');
initRouter(app);
app.listen(port, () => {
    console.log(`Server running with http://localhost:${port}`)
})