import express from "express";
import chatBotRouter from './routes/chatBot.js';


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/chat', chatBotRouter);

app.listen(PORT, () => {
    console.log(`listening on port = ${PORT}`);
})