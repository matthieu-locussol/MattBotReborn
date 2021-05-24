module.exports = {
   apps: [
      {
         name: 'MattBotReborn - Production',
         script: 'yarn start',
         error_file: 'logs/production.log',
         out_file: 'logs/production.log',
         env_production: {
            NODE_ENV: 'production',
         },
      },
      {
         name: 'MattBotReborn - Development',
         script: 'yarn dev',
         error_file: 'logs/development.log',
         out_file: 'logs/development.log',
         env_production: {
            NODE_ENV: 'development',
         },
      },
   ],
};