# SlackBot Random Volunteer

This is the code for a simple slack-bot that when invoked with `/random-volunteer` will select a participant from that channel at random.

__Limitation:__ Currently this bot only supports picking out volunteers in public channels.

## Running this slack-bot

To get this code working, you have to:

1. Register a Slack app for your workspace
2. Add a slash command to it
  - Point that command to hit `<deployed-base-url-of-this-program>/random`
3. Add the permissions of `channels:read`, `groups:read`, `im:read` and `mpim:read` to that bot
4. Create a `.env` at the home directory of this project
5. Put your bot's OAuth Access token inside `.env` in the format `SLACK_OAUTH_TOKEN=<token-goes-here>`