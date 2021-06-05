import { MessageComponentInteraction } from 'discord.js';

export const handleButton = (interaction: MessageComponentInteraction) => {
   const username = interaction.member.user.username;
   interaction.reply(`${username} a cliqué sur le bouton "Hello" !`);
};

export const handleButton2 = (interaction: MessageComponentInteraction) => {
   const username = interaction.member.user.username;
   interaction.reply(`${username} a cliqué sur le bouton 2, "deuxième bouton" ! Suceur de queue va`);
};

export const musicUi = {
   button: handleButton,
   button2: handleButton2,
};
