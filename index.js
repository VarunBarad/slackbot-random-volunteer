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

    const channelName = request.body.channel_name;
    if (channelName === 'privategroup' || channelName === 'directmessage') {
        response.json({
            response_type: "in_channel",
            text: ":cry: sorry but I can only work in public channels for now."
        });
    } else {
        response.json({
            response_type: "ephemeral",
            text: "Wait a minute, I am picking a volunteer"
        });
    }
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});