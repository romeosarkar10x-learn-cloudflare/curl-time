export async function sleep(millis: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), millis);
    });
}

export function getTime() {
    const now = new Date();
    const timeZoneOffset = now.getTimezoneOffset();

    const utc = Math.trunc(now.getTime() / 1000) - timeZoneOffset;
    const ist = utc + 5.5 * 60 * 60;

    const seconds = (ist % 60).toString().padStart(2, "0");
    const minutes = (Math.trunc(ist / 60) % 60).toString().padStart(2, "0");
    const hours = (Math.trunc(ist / 3600) % 24).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}
