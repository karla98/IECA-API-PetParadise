const express = require('express');
require('dotenv').config();
require('./config/db');
const cors = require('cors');

const app = express();

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server corriendo en ${PORT}`)
})