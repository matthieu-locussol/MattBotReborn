import { Canvas, Image } from 'canvas';
import { Interaction, MessageAttachment } from 'discord.js';
import mergeImages from 'merge-images';
import { random, sum } from '../../../utils/utils';

export type DICE_TYPE = 'classic' | 'board';

const SIZES: Record<DICE_TYPE, number> = {
   classic: 80,
   board: 88,
};

const VALUES: Record<DICE_TYPE, number> = {
   classic: 6,
   board: 12,
};

export const roll = async (interaction: Interaction, type: DICE_TYPE = 'classic', count = 1) => {
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
      interaction.reply(`Rolled ${count} ${type} dices: total of ${sum(rolls)}!`, {
         files: [attachment],
      });
   }
};
