import { writeTime } from "./terminal-utils";

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const { readable, writable } = new TransformStream();

        (async function () {
            const writer = writable.getWriter();
            await writeTime(writer);
            writer.close();
        })();

        return new Response(readable, { headers: { "content-type": "text/plain; charset=utf-8" } });
    },
};
