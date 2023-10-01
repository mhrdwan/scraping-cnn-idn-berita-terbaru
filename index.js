import { NOTIMP } from "dns"

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const port = 3000
const fs = require('fs')
const { getisiberita } = require(`./controller/CNN_COntroller`)
const userRoutes = require('./Router/CNN_Router');
const jwt = require('jsonwebtoken');
app.use(express.json());
let no = 1

// datacari()

app.use('/get', userRoutes);

app.post('/getberita', async (req, res) => {
    try {
        const link = req.body.link

        const data = await getisiberita(link)
        res.send(data);
    } catch (error) {
        console.error("Error reading file: ", error);
        res.status(500).send("Error reading file");
    }
});



app.listen(port, () => console.log(`server jalan di port`, port))
