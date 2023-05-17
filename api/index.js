const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
// const multer = require("multer");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require("./routes/posts");
// const router = express.Router();
// const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).catch(function (err) {
    console.log('DB connection failed: ', err);
    process.exit(1);
});

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.listen(8800, () => {
    console.log('Backend server is running!');
});
