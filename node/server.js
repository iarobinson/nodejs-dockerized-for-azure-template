require('dotenv').config()
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.set('views', path.join(__dirname, 'app/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('app/assets/images'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app/views/index.html");
})

app.get("/api/v1/quotes", (req, res) => {
    let randomQuote = getRandomQuote();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(randomQuote);
})

const getRandomQuote = () => {
    const randomQuotes = [
        "'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' - Martin Fowler",
        "'First, solve the problem. Then, write the code.' - John Johnson",
        "'Experience is the name everyone gives to their mistakes.' - Oscar Wilde",
        "'In order to be irreplaceable, one must always be different' - Coco Chanel",
        "'Java is to JavaScript what car is to Carpet.' - Chris Heilmann",
        "'Knowledge is power.' - Francis Bacon",
        "'Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.' - Dan Salomon",
        "'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.' - Antoine de Saint-Exupery",
        "'Ruby is rubbish! PHP is phpantastic!' - Nikita Popov",
        "'Code is like humor. When you have to explain it, it's bad.' - Cory House",
        "'Fix the cause, not the symptom.' - Steve Maguire",
        "'Optimism is an occupational hazard of programming: feedback is the treatment. ' Kent Beck",
        "'When to use iterative development? You should use iterative development only on projects that you want to succeed.' - Martin Fowler",
        "'Simplicity is the soul of efficiency.' - Austin Freeman",
        "'Before software can be reusable it first has to be usable.' - Ralph Johnson",
        "'Make it work, make it right, make it fast.' - Kent Beck",
    ];
    let randomQuoteIndex = Math.floor(Math.random() * randomQuotes.length);
    return randomQuotes[randomQuoteIndex];
}

const PORT = normalizePort(process.env.PORT || '3000');
const HOST = process.env.HOST || '0.0.0.0';

app.set('port', PORT);
console.log(`Node server running on port: http://${HOST}:${PORT}`)

app.listen(PORT, HOST);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
