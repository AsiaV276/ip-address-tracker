
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

app.get('/ip/:ipAddress', async (req, res) => {
    console.log(req.params);
    const ipAddress = req.params.ipAddress
    const api_url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_API_KEY}&ipAddress=${ipAddress}`
    const ipAddressResponse = await fetch(api_url);
    const json = await ipAddressResponse.json();
    res.json(json); //makes the api call and then sends back to client, proxy server
})