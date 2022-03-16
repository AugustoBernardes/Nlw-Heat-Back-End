import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { router } from "./routes"

dotenv.config()

const app = express();
app.use(cors());

// Creating server with http
const serverHttp = http.createServer(app);
app.use(express.json());

const io = new Server(serverHttp,{
    cors:{
        origin: "*"
    }
})

// Listening socket
io.on("connection",socket => { 
    console.log(`User conected on socket ${socket.id}`)
});

app.use(router);

export { serverHttp,io }