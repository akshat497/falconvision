const express = require('express');
const cors = require('cors');
const app = express();
require('./models');
const { APP_PORT } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
app.use(express.json({ limit: "200mb" }));
// System Middlewares
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello server");
});

// Custom Middlewares
app.use(errorHandler);

app.listen(APP_PORT, () => {
  console.log('Server started at ' + APP_PORT);
});
