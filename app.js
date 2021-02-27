const express = require('express');
const app = express();
const brain = require('brain.js');
const data = require('./trainingData.json');

const neural_network = new brain.recurrent.LSTM();

const trainingData = data.map(m => ({
    input : m.text,
    output : m.problem
}));

neural_network.train(trainingData, {
    iterations : 2000
});

app.use(express.json());
app.use(express.urlencoded({extended : false }));

app.post('/api/checking', (req, res) => {
    let { problem } = req.body;
    const output = neural_network.run(problem);
    res.send(`${output}에 문제가 있어 보이시네요.`);
});

app.listen(8081, () => {
    console.log('server on');
});

