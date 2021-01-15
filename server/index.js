const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./services/config/db');
const route = require('./api/routes/index');
const dotenv = require('dotenv');
const path = require('path');

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dotenv.config();
// var corsOptions = {
//   origin: "http://localhost:8081",
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended : false,
    limit: '50mb'
}))

app.use(bodyParser.json({
    limit: '50mb', 
    extended: true
}));
app.use(morgan('dev'));


route(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
})
