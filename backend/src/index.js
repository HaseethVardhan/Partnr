import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { server } from "./socket.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    

    server.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening....`);
        
    })
})
.catch((err) => {
    console.log(`Mongo DB connection failed!!!`, err);
    
})