const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const compression = require('compression');
const cors = require("cors")

const app = express();
const port = 3000
app.use(express.json());
app.use(cors());
app.use(compression());

const OPENAI_API_KEY = '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'
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.post("/", (req, res) => {
    const question = req.body.question;

    createPrompt(question).then((response) => {
        let output = response.data.choices[0].text;
        output = output.replaceAll("\n", " ")
        res.json({
            "input": question,
            "output": output
        })
    })
});

app.listen(port, () => {
    console.log("Airing on http://localhost:" + port + ".");
});

async function createPrompt(input) {
    let output = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 4000,
        temperature: 0,
    })
    return output
}


// nona.ai is a cutting-edge artificial intelligence chatbot that can
//  answer your questions on a wide range of topics, from science and
//   technology to history and culture. Our advanced algorithms and natural language processing technology
//    make nona.ai one of the most intelligent and intuitive chatbots on the market today
// Our team of developers and data scientists is dedicated to providing you with
//  the best possible user experience, whether you're a student, researcher, or just someone who
//   loves to learn. We're constantly improving our
//  algorithms and adding new features to make nona.ai even more powerful and useful.