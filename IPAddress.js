
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));

app.get('/:ipAddress?/:domain?', async (req, res) => {
    console.log(req.params);
    const ipAddress = req.params.ipAddress;
    const domain = req.params.domain;
    if(domain == undefined) {
        var api_url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_API_KEY}&ipAddress=${ipAddress}`
    } else {
        var api_url = `https://geo.ipify.org/api/v1?apiKey=${process.env.IP_API_KEY}&ipAddress=${domain}`
    }
    const ipAddressResponse = await fetch(api_url);
    const json = await ipAddressResponse.json();
    res.json(json); //makes the api call and then sends back to client, proxy server
})