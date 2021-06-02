# MattBotReborn

[![CodeQL](https://github.com/matthieu-locussol/MattBotReborn/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/matthieu-locussol/MattBotReborn/actions/workflows/codeql-analysis.yml)

## Installation on server

```bash
yarn install

pm2 install pm2-logrotate

# Maximum number of saved log files
pm2 set pm2-logrotate:retain 30
# Minimum size required to split a log file
pm2 set pm2-logrotate:max_size 10M
# At which interval the worker is checking the log's size
pm2 set pm2-logrotate:workerInterval 300
```

## Invite link

[Invite production bot](https://discord.com/api/oauth2/authorize?client_id=845716376696913960&permissions=8&scope=bot%20applications.commands)

[Invite development bot](https://discord.com/api/oauth2/authorize?client_id=845718174741692446&permissions=8&scope=bot%20applications.commands)
