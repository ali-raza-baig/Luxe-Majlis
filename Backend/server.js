import app from './index.js';
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const server = http.createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on : ${PORT}`)
});