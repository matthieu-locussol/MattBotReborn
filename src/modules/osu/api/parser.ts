import Chart from 'chart.js';
import { CanvasRenderService } from 'chartjs-node-canvas';
import { statSync, writeFileSync } from 'fs';
import { diff, modbits, parser, ppv2 } from 'ojsama';
import { createInterface } from 'readline';
import { logger } from '../../../client';
import { average } from '../../../utils/utils';
import { CHART_BACKGROUND_COLOR, CHART_BORDER_COLOR, CHART_HEIGHT, CHART_STRAINS, CHART_WIDTH } from '../constants';

type Args = {
   mods: number;
   acc?: number;
   combo?: number;
   n300?: number;
   n100?: number;
   n50?: number;
   miss?: number;
   id?: number;
   maxCombo?: number;
};

const osuParser = new parser();

const parseArgs = (argv: string[]) => {
   const args: Args = {
      mods: 0,
   };

   for (const arg of argv.slice(2)) {
      if (arg.startsWith('+')) {
         const mods = arg.slice(1) || '';
         args.mods = modbits.from_string(mods);
      }

      args.acc = arg.endsWith('%') ? parseFloat(arg) : args.acc;
      args.combo = arg.endsWith('x') ? parseInt(arg) : args.combo;
      args.n300 = arg.endsWith('t') ? parseInt(arg) : args.n300;
      args.n100 = arg.endsWith('h') ? parseInt(arg) : args.n100;
      args.n50 = arg.endsWith('f') ? parseInt(arg) : args.n50;
      args.miss = arg.endsWith('m') ? parseInt(arg) : args.miss;
      args.id = arg.endsWith('ID') ? parseInt(arg) : args.id;
      args.maxCombo = arg.endsWith('MAX') ? parseInt(arg) : args.maxCombo;
   }

   return args;
};

const computeChart = (difficulty: osu.std_diff, filename: string) => {
   try {
      statSync(filename);
      logger.log({ id: 'LOG_Osu_Beatmap_Chart_Found', filename });
      return;
   } catch (error) {
      if (error?.code === 'ENOENT') {
         logger.log({ id: 'LOG_Osu_Beatmap_Chart_Not_Found', filename });
      }
   }

   const data = difficulty.objects.map((o: osu.std_diff_hitobject) => o.strains);

   const strains_max = CHART_STRAINS < data.length ? CHART_STRAINS : data.length;
   const strains_length = data.length;
   const step = strains_length / strains_max || 1;

   const averages: number[] = [];

   for (let i = 0; i < strains_max; ++i) {
      // Slice of strains to sum
      const slice = data.slice(i * step, (i + 1) * step);
      // Average of speed + aim
      const perfs = slice.map((e) => (e[0] + e[1]) / 2);

      averages.push(average(perfs));
   }

   logger.log({ id: 'LOG_Osu_Beatmap_Chart_Rendering', filename });

   const canvas = new CanvasRenderService(CHART_WIDTH, CHART_HEIGHT, (chart: typeof Chart) => {
      chart.defaults.scale.display = false;
      chart.defaults.global.legend.display = false;
      chart.defaults.global.elements.point.radius = 0;
   });
   const configuration = createConfiguration(averages);
   const buffer = canvas.renderToBufferSync(configuration);

   writeFileSync(filename, buffer);

   logger.log({ id: 'LOG_Osu_Beatmap_Chart_Cached', filename });
};

const createConfiguration = (data: number[]) => {
   const configuration: Chart.ChartConfiguration = {
      type: 'line',
      data: {
         labels: data.map(() => ''),
         datasets: [
            {
               data,
               borderWidth: 1,
               borderColor: CHART_BORDER_COLOR,
               backgroundColor: CHART_BACKGROUND_COLOR,
            },
         ],
      },
      options: {
         scales: {
            yAxes: [
               {
                  ticks: {
                     max: Math.max(...data),
                  },
               },
            ],
         },
      },
   };

   return configuration;
};

createInterface({
   input: process.stdin,
   terminal: false,
})
   .on('line', osuParser.feed_line.bind(osuParser))
   .on('close', async () => {
      const { mods, acc: acc_percent, combo, n300, n100, n50, miss: nmiss, id, maxCombo } = parseArgs(process.argv);
      const map = osuParser.map;
      const chartFilename = `./cache/osu/${id}_${mods}.png`;

      const stars = new diff().calc({ map: map, mods: mods });
      const starsResult = stars.toString().split(' ')[0];

      const pp = ppv2({ stars, combo, n300, n100, n50, nmiss, acc_percent });
      const accResult = pp.computed_accuracy.toString().split(' ')[0];
      const ppResult = Math.round(pp.total * 100) / 100;

      const ppFc = ppv2({ stars, combo: maxCombo, n300, n100, n50, nmiss: 0, acc_percent });
      const accFcResult = ppFc.computed_accuracy.toString().split(' ')[0];
      const ppFcResult = Math.round(ppFc.total * 100) / 100;

      if (id) {
         computeChart(stars, chartFilename);
      }

      process.stdout.write(`${starsResult} ${accResult} ${ppResult} ${accFcResult} ${ppFcResult}`);
   });
