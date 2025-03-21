const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const notes = require('./routes/notes');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/notes', notes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})