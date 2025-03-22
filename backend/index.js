const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const checkToken = require('./middleware/auth/checkToken');

const app = express()
const port = 3000

const cors = require("cors");


app.use(cors({
    origin: "*", // Dostosuj do portu frontendu
    credentials: true
  }));


app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/notes', checkToken, notes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})