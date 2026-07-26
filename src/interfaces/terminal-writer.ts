export interface TerminalWriter {
    write: (text: string) => unknown | Promise<unknown>;
}
