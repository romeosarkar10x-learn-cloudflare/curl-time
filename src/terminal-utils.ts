import { art } from "./ascii-art.ts";
import type { TerminalWriter } from "./interfaces/terminal-writer.ts";
import { getTime, sleep } from "./utils.ts";
import {
    CLEAR_SCREEN,
    ENTER_ALTERNATE_SCREEN,
    EXIT_ALTERNATE_SCREEN,
    HIDE_CURSOR,
    MOVE_CURSOR,
} from "./vt-terminal-sequences.ts";

class TerminalUtils {
    private writer: TerminalWriter;

    constructor(writer: TerminalWriter) {
        this.writer = writer;
    }

    async writeLineLeftToRight(
        text: string,
        cursorPos: { r: number; c: number } = { r: 1, c: 1 },
    ): Promise<{ height: number; width: number }> {
        let height = 0;
        let width = 0;

        let r = cursorPos.r;
        let c = cursorPos.c;

        for (const char of text) {
            const { width: charWidth, height: charHeight } = await this.writeCharLeftToRight(char, { r, c });
            c += charWidth + 1;

            width += charWidth;
            height = charHeight;
        }

        return { height, width };
    }

    async writeCharLeftToRight(
        char: string,
        cursorStartingPosition: { r: number; c: number },
    ): Promise<{ height: number; width: number }> {
        const glyph = art.characters[char.charCodeAt(0)];

        if (!glyph) {
            throw new Error(`Unsupported character: ${JSON.stringify(char)}`);
        }

        const height = glyph.length;

        for (let i = 0; i < height; i++) {
            const r = cursorStartingPosition.r + i;
            const c = cursorStartingPosition.c;

            this.writer.write(MOVE_CURSOR(r, c));
            this.writer.write(glyph[i]!);
        }

        return { height, width: glyph[0]!.length };
    }

    async writeCharRightToLeft(
        char: string,
        cursorStartingPosition: { r: number; c: number },
    ): Promise<{ height: number; width: number }> {
        const glyph = art.characters[char.charCodeAt(0)];

        if (!glyph) {
            throw new Error(`Unsupported character: ${JSON.stringify(char)}`);
        }

        const height = glyph.length;
        const width = glyph[0]!.length;

        for (let i = 0; i < height; i++) {
            const r = cursorStartingPosition.r + i;
            const c = cursorStartingPosition.c - width;

            this.writer.write(MOVE_CURSOR(r, c));
            this.writer.write(glyph[i]!);
        }

        return { height, width };
    }
}

export async function writeTime(writer: TerminalWriter) {
    const terminalUtils = new TerminalUtils(writer);
    await writer.write(ENTER_ALTERNATE_SCREEN);
    await writer.write(HIDE_CURSOR);

    for (let i = 0; i < 4 * 60 * 2; i++) {
        terminalUtils.writeLineLeftToRight(getTime());
        await sleep(250);
        await writer.write(CLEAR_SCREEN);
    }

    await writer.write(EXIT_ALTERNATE_SCREEN);
}
