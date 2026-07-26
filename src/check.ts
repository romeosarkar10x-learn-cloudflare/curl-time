function foo() {
    const x = Math.random();

    return x >= 2;
}

interface I {
    foo: (() => void) | (() => Promise<void>);
}

const i: I = { foo };

await i.foo();
