export function assertShape<T extends object>(value: unknown, requiredKeys: (keyof T)[], context: string): asserts value is T {
    if (typeof value !== 'object' || value === null) {
        throw new Error(`${context}: expected a JSON object in the response body, got ${typeof value}`);
    }

    const missingKeys = requiredKeys.filter((key) => !(key in value));
    if (missingKeys.length > 0) {
        throw new Error(`${context}: response body is missing expected field(s): ${missingKeys.join(', ')}. Got: ${JSON.stringify(value)}`);
    }
}
