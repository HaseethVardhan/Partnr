import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import passport from "passport"
import './controllers/oauth.controller.js'
import oauthRouter from './routes/oauth.routes.js'
import messageRouter from './routes/message.routes.js'
import session from 'express-session'


const app = express()

app.use(cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true 
}))

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

app.head("/", (req, res) => {
  res.status(200).end();
});

app.use('/user', userRouter)
app.use('/auth', oauthRouter)
app.use('/message', messageRouter)

export { app }
