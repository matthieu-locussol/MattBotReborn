# Contributing to this repository

## Setting up your development bot

### Getting started

-  MattBot is powered by [Node.js](https://nodejs.org/en/) & [TypeScript](https://www.typescriptlang.org/). At the time
   writing this, you will need version 14.0.0 or higher. If this can be useful, I currently use the version 15.12.0
-  I use [Yarn](https://yarnpkg.com/) as a package manager and I am currently using version 1.22.5
-  [PM2](https://pm2.keymetrics.io/) is used as a daemon process manager, my current version is 4.5.6

I will assume that you already have installed these tools. If it's not the case and if you have troubles installing
them, you should refer to their own documentation.

### Setting up your environment

After cloning/forking the repository, install the project following the
[install instructions in the README file](https://github.com/matthieu-locussol/MattBotReborn/blob/master/README.md#installation-on-server).
You will then need to create an environment file `.env` at the root of the directory. Its structure should be the same
as the `.env.sample` file.

Three variables and mandatory for you to be able to start developing:

-  `DISCORD_ADMIN_ID`: basically, you need to set your own Discord User ID
   ([_Where can I find my User ID?_](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-))
-  `DISCORD_APPID_DEVELOPMENT`
-  `DISCORD_TOKEN_DEVELOPMENT`

_You will not need to set variables `DISCORD_APPID_PRODUCTION` or `DISCORD_TOKEN_PRODUCTION` as these variables are used
only for the production bot that you will not manage directly. Other variables are optional and module-specific, which
means you will only need to set `OSU_API_KEY` if you plan on using Osu! module related features in your development bot.
If you need to add environment variables as part of your development, add them under this module-specific section of the
`.env.sample` file._

1. In order to provide the MattBot with valid Discord AppID and Token, you will need to register a new discord
   application on the [Discord Developer Portal](https://discord.com/developers/applications). Once you application is
   created, you will be able to copy its ID called **APPLICATION ID** (e.g. `845716376696913960`) and set it as the
   `DISCORD_APPID_DEVELOPMENT` variable value in your `.env` file.
2. Then, you can now click on the left section "**Bot**" to create a new Bot for your Discord application. Give it a
   name (`MattBot_Swag`?), a cool icon, and create it! You can now copy its secret token. _**You should never share this
   token with anyone.**_
3. Set your token as the `DISCORD_TOKEN_DEVELOPMENT` variable value in your `.env` file and you are done!

### Running your development bot

In order to run your bot in development mode, you can now run:

```bash
pm2 startOrRestart pm2.development.json
```

If everything worked correctly, you should now be able to see your bot running by taking a look at your pm2 process
logs:

```bash
pm2 log
```

Example output after the bot successfully started:

```
[INFO] 23:41:43 > Logged in as MattBotReborn_Dev#6468!
```

### Invite your development bot to a Discord server you own

It is important to note that the bot might require high level privileges to run correctly. It means that you also will
need some high level privileges to invite it in your server and start interacting with it. The easiest way is to create
your own Discord server and ask a server's administrator to invite your bot directly.

Use this to generate the correct invite link for you development bot (_replace `DISCORD_APPID_DEVELOPMENT` by your own
**APPLICATION ID**_):

```
https://discord.com/api/oauth2/authorize?client_id=DISCORD_APPID_DEVELOPMENT&permissions=8&scope=bot%20applications.commands
```

You should now be able to see your bot online on the server!

### Populate slash commands

Discord slash commands are used to register the MattBot's modules commands. Discord wrote a
[guide on slash commands and specifically about "Registering a Command"](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command),
so I will quote the essential part (**a guild is a server** in Discord terminology):

-  There are two kinds of Slash Commands: **global commands** and **guild commands**. Global commands are available for
   every guild that adds your app. An individual app's global commands are also available in DMs if that app has a bot
   that shares a mutual guild with the user. Guild commands are specific to the guild you specify when making them.
   Guild commands are not available in DMs. Command names are unique per application within each scope (global and
   guild).
-  _**Global commands are cached for 1 hour.** That means that new global commands will fan out slowly across all
   guilds, and will be guaranteed to be updated in an hour._
-  _**Guild commands update instantly.** We recommend you use guild commands for quick testing, and global commands when
   they're ready for public use._

MattBot comes with two very specific commands that can only be used by the bot owner (that is, the User corresponding to
the `DISCORD_ADMIN_ID` variable value):

-  `!POPULATE_GUILD`: removes every previously registered slash commands within the guild you sent the message &
   recreate them all (if no slash commands were registered, it just creates them all)
-  `!POPULATE_GLOBAL`: removes every previously registered global slash commands & recreate them all (if no slash
   commands were registered, it just creates them all)

These commands should just be sent as a normal message in a channel your development bot can access to. If it worked
correctly, you should be able to see it in the logs.

## Adding a new module

Coming soon...
