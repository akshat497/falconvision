const express = require('express')
const app = express()
require('./models')
const { APP_PORT } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

//System Middlewares
app.use(express.json());
app.use("/api", router)

app.get("/", (req, res) => {
    res.send("hello server")
})


//Custom Middlewares
app.use(errorHandler)

app.listen(APP_PORT, () => {
    console.log('server started at ' + APP_PORT);
})