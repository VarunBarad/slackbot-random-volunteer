'use strict';

require('dotenv').config();

const slackOauthToken = process.env.SLACK_OAUTH_TOKEN;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

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
        const channelId = request.body.channel_id;
        const lateResponseUrl = request.body.response_url;

        response.json({
            response_type: "ephemeral",
            text: "Wait a minute, I am picking a volunteer"
        });

        axios.get('https://slack.com/api/conversations.members', {
            params: {
                token: slackOauthToken,
                channel: channelId
            }
        }).then(response => response.data.members).then(members => {
            const randomMemberId = members[Math.floor(Math.random() * members.length)];

            axios.post(lateResponseUrl, {
                response_type: "in_channel",
                text: `:bell::bell::bell: lucky volunteer of this draw is <@${randomMemberId}>`
            });
        });
    }
});

const portNumber = process.env.PORT;
app.listen(portNumber, () => {
    console.log(`Your app is listening on port ${portNumber}`);
});
