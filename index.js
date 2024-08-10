const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const Task = require("./models/taskModel");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: ["https://deploy-frontend-green.vercel.app"],methods:["GET","POST","PUT","DELETE"],credentials:true}));
app.use(express.json());

// Routes
app.use('/', taskRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Error handling middleware
app.use(errorHandler);
