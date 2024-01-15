import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";
import express from "express";
const router = express.Router();

const model = new LlamaModel({
    modelPath: path.join("E:/Models/llama-2-7b-chat.Q4_K_S.gguf")
});
const context = new LlamaContext({model: model, threads: 5, contextSize: 1024});
const session = new LlamaChatSession({contextSequence: context.getSequence()});

router.post("/", async (req, res) => {
    try {
        const system_prompt = "You are a story generation engine. Your job is to generate story considering the information given below.";
        const user_message = `continue the story using the below given information\n ${req?.body?.userMessage}`

        const promptTemplate = `<s>[INST]<<SYS>>${ system_prompt }<</SYS>>\n\n${ user_message }[/INST]`;

        let ai = await session.prompt(promptTemplate, {temperature: 0.75, topK: 50, topP: 0.7, trimWhitespaceSuffix: true});
        ai = ai.replace(/\n/g, '<br>')
        res.status(200).json({chatBot: `<p>${ai}</p>`});
    }catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).json({message: "Internal Server Error"})
          }
    }
})

export default router;