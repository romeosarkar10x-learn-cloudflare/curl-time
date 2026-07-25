async function sleep(millis: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, millis);
    });
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        // return new Response(env.MESSAGE);
        // const clientIpAddress = request.headers.get("CF-Connecting-IP");
        // const headers = Array.from(request.headers.entries());
        // return new Response(JSON.stringify({ headers }), { headers: { "Content-Type": "application/json" } });

        const { readable, writable } = new TransformStream();

        // const encoder = new TextEncoder();

        (async function loop() {
            const writer = writable.getWriter();

            for (let i = 0; i < 20; i++) {
                writer.write(`${i}\n`);
                await sleep(500);
            }

            writer.close();
        })();

        return new Response(readable, { headers: { "content-type": "text/plain" } });
    },
};
