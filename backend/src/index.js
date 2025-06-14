import dotenv from "dotenv"
import http from 'http'
import connectDB from "./db/index.js"
import {app} from './app.js'
import { initializeSocket } from "./socket.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    
    const server = http.createServer(app)
    initializeSocket(server)

    server.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening....`);
        
    })
})
.catch((err) => {
    console.log(`Mongo DB connection failed!!!`, err);
    
})