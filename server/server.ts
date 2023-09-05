import express from "express"
import cors from "cors"
import mongoose, { mongo } from "mongoose"
import helmet from "helmet"
import morgan from "morgan"
import passport from "passport"
import session from "express-session"

// const cors = require('cors');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const morgan = require('morgan');
// // const session = require("express-session");
// const passport = require("passport");
// require('./passport')
import './passport'

//setup routes
import authRoute from './routes/auth'
import gptRoute from './routes/gpt'

//config environment variables
import dotenv from "dotenv";
dotenv.config()

//setup express
var app = express()
var PORT = process.env.PORT || 4000
const origin = "http://localhost:3000"

//
//  MIDDLEWARE
//
app.use(require('express-session')({ secret: 'goatalert@#%@#', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: origin, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());

//logger
const logger = (req: any, res: any, next: any) => {
  const currentDate = new Date()
  const logTime = `${currentDate
    .getHours()
    .toString()
    .padStart(2, '0')}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`

  console.log(`👉[${logTime}] ${req.method} ${req.url}`)
  next()
}
app.use(logger)

//
// DB Connection 
//
let mongoURI = process.env.MONGO_URI ?? ""
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => ('❌ Error connecting to MongoDB: ' + err))


//use routes and listen 
app.use('/auth', authRoute)
app.use('/gpt', gptRoute)

app.listen(PORT, () => {
  console.log(`✅ Server listening on PORT ${PORT}`);
})