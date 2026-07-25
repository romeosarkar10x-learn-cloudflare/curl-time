import { art } from "./ascii-art.ts";

const ENTER_ALTERNATE_SCREEN = "\x1b[?1049h";
const EXIT_ALTERNATE_SCREEN = "\x1b[?1049l";

const HIDE_CURSOR = "\x1b[?25l";

// note: cursor position starts from row: 1, col: 1

const MOVE_CURSOR_TOP_LEFT = "\x1b[1;1H";
const MOVE_CURSOR = (row: number, col: number) => `\x1b[${row};${col}H`;

async function sleep(millis: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), millis);
    });
}

process.stdout.write(ENTER_ALTERNATE_SCREEN);
process.stdout.write(HIDE_CURSOR);

writeLine("1234");
// writeChar("1", { r: 1, c: 1 });
await sleep(2000);

process.stdout.write(EXIT_ALTERNATE_SCREEN);

function writeLine(text: string, cursorPos: { r: number; c: number } = { r: 1, c: 1 }) {
    // const width = (text.length - 1) * 2 + text.length * art.dimensions[1];

    // process.stdout.write(MOVE_CURSOR(cursorPos.r, cursorPos.c));

    let r = cursorPos.r;
    let c = cursorPos.c;

    for (const char of text) {
        writeChar(char, { r, c });
        c += art.dimensions[1] + 2;
    }
}

function writeChar(char: string, cursorPos: { r: number; c: number }) {
    const glyph = art.characters[char.charCodeAt(0)];

    if (!glyph) {
        throw new Error(`Unsupported character: ${JSON.stringify(char)}`);
    }

    for (let i = 0; i < art.dimensions[0]; i++) {
        const r = cursorPos.r + i;
        const c = cursorPos.c;

        process.stdout.write(MOVE_CURSOR(r, c));
        process.stdout.write(glyph[i]!);
    }
}
