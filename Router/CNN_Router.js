// userRoutes.js
const express = require('express');
const router = express.Router();
const {datacari,getisiberita} = require(`../controller/CNN_COntroller`)
const app = express()

router.get('/', datacari);
app.post('/getberita', getisiberita);

module.exports = router;
