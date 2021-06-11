import { Canvas, Image } from 'canvas';
import { Interaction, MessageAttachment } from 'discord.js';
import mergeImages from 'merge-images';
import { random, sum } from '../../../utils/utils';

export type DICE_TYPE = 'd6' | 'd12' | 'd20';

const SIZES: Record<DICE_TYPE, number> = {
   d6: 80,
   d12: 88,
   d20: 82,
};

const VALUES: Record<DICE_TYPE, number> = {
   d6: 6,
   d12: 12,
   d20: 20,
};

export const roll = async (interaction: Interaction, type: DICE_TYPE = 'd6', count = 1) => {
   const rolls: number[] = [];

   [...Array(count)].forEach(() => rolls.push(random(1, VALUES[type])));

   const image = await mergeImages(
      rolls.map((roll, idx) => ({
         src: `assets/dices/${type}/${roll}.png`,
         x: SIZES[type] * idx,
         y: 0,
      })),
      {
         Canvas: Canvas,
         Image: Image,
         width: SIZES[type] * rolls.length,
      },
   );
   const attachment = new MessageAttachment(Buffer.from(image.replace(/^data:image\/png;base64,/, ''), 'base64'));

   if (interaction.isCommand() || interaction.isMessageComponent()) {
      interaction.reply(`Rolled ${count} ${type.toUpperCase()} dices: total of ${sum(rolls)}!`, {
         files: [attachment],
      });
   }
};
