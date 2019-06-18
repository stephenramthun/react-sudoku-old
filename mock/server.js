const express = require('express');
const service = require('./service/puzzleService');

const server = express();
const port = process.env.PORT || 8080;

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

server.get('/api/board/:difficulty', async (req, res) => {
    const difficulty = req.params.difficulty;
    const puzzle = service.getPuzzle(difficulty);
    res.send(puzzle);
});

server.listen(port, () => {
    console.log(`Started mock sudoku server on ${port}`);
});
