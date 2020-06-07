'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require("cors");
app.use(cors({optionSuccessStatus: 200})); // some legacy browsers choke on 204

app.use(bodyParser.urlencoded({extended: false}));

app.post('/random', function (request, response) {
    console.log(request);
    response.json({
        "response_type": "in_channel",
        "text": "Yayy, the command worked"
    });
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});