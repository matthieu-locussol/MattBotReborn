export const CHART_WIDTH = 299;
export const CHART_HEIGHT = 40;
export const CHART_STRAINS = 100;
export const CHART_BORDER_COLOR = 'rgba(107, 129, 255, 1)';
export const CHART_BACKGROUND_COLOR = 'rgba(107, 129, 255, 0.4)';

export const COLORS = {
   F: 0xe7434a,
   D: 0xf33836,
   C: 0xff35f0,
   B: 0x3b73ff,
   A: 0x46e424,
   S: 0xfef337,
   SH: 0xddfaff,
   X: 0xfef337,
   XH: 0xddfaff,
};

export const BEATMAP_STATE = {
   '-2': 'state.graveyard',
   '-1': 'state.wip',
   '0': 'state.pending',
   '1': 'state.ranked',
   '2': 'state.approved',
   '3': 'state.qualified',
   '4': 'state.loved',
};

export const MODS = {
   None: 0,
   NoFail: 1,
   Easy: 1 << 1,
   TouchDevice: 1 << 2,
   Hidden: 1 << 3,
   HardRock: 1 << 4,
   SuddenDeath: 1 << 5,
   DoubleTime: 1 << 6,
   Relax: 1 << 7,
   HalfTime: 1 << 8,
   Nightcore: 1 << 9,
   Flashlight: 1 << 10,
   Autoplay: 1 << 11,
   SpunOut: 1 << 12,
   Relax2: 1 << 13,
   Perfect: 1 << 14,
   Key4: 1 << 15,
   Key5: 1 << 16,
   Key6: 1 << 17,
   Key7: 1 << 18,
   Key8: 1 << 19,
   FadeIn: 1 << 20,
   Random: 1 << 21,
   Cinema: 1 << 22,
   Target: 1 << 23,
   Key9: 1 << 24,
   KeyCoop: 1 << 25,
   Key1: 1 << 26,
   Key3: 1 << 27,
   Key2: 1 << 28,
   KeyMod: 521109504,
   FreeModAllowed: 522171579,
   ScoreIncreaseMods: 1049662,
};
