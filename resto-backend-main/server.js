const express = require('express');
const cors = require('cors');
const app = express();
require('./models');
const { APP_PORT } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
app.use(express.json({ limit: "300mb" }));
// System Middlewares
app.use(cors()); // Enable CORS for all routes
const cron = require('node-cron'); 
const contactUsController = require('./controller/contactUsData/contactUsController');

app.use(express.json());
app.use("/api", router);
app.use("/uploads",express.static('uploads'))
app.get("/", (req, res) => {
  res.send("hello server");
});

// Custom Middlewares
app.use(errorHandler);
cron.schedule('0 0 * * *', async () => {
  await contactUsController.deleteExpiredContactUs();
});
app.listen(APP_PORT, () => {
  console.log('Server started at ' + APP_PORT);
});
