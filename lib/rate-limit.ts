export class RateLimiter {
    private static counters = new Map<string, { count: number; lastReset: number }>();

    static async check(identifier: string, limit: number, windowMs: number): Promise<boolean> {
        const now = Date.now();
        const state = this.counters.get(identifier) || { count: 0, lastReset: now };

        if (now - state.lastReset > windowMs) {
            state.count = 1;
            state.lastReset = now;
        } else {
            state.count++;
        }

        this.counters.set(identifier, state);

        return state.count <= limit;
    }
}
