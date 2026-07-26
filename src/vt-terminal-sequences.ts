export const ENTER_ALTERNATE_SCREEN = "\x1b[?1049h";
export const EXIT_ALTERNATE_SCREEN = "\x1b[?1049l";

// note: cursor position starts from row: 1, col: 1
export const HIDE_CURSOR = "\x1b[?25l";
export const CLEAR_SCREEN = "\x1b[2J";

export const MOVE_CURSOR = (row: number, col: number) => `\x1b[${row};${col}H`;
