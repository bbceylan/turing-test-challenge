/**
 * Utility to scrub sensitive data from objects before logging.
 * Recursively traverses objects and arrays.
 */

const SENSITIVE_KEYS = [
    'password',
    'email',
    'token',
    'key',
    'secret',
    'credit_card',
    'note',
    'content', // Journal content
    'answer',  // User answers
];

export const scrubSensitiveData = (data: any): any => {
    if (!data) return data;

    if (typeof data === 'string') {
        // Basic pattern matching (optional, keeping it simple for now)
        // If string contains explicit sensitive markers, could act here.
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(item => scrubSensitiveData(item));
    }

    if (typeof data === 'object') {
        const scrubbed: any = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const lowerKey = key.toLowerCase();
                const isSensitive = SENSITIVE_KEYS.some(k => lowerKey.includes(k));

                if (isSensitive) {
                    scrubbed[key] = '[REDACTED]';
                } else {
                    scrubbed[key] = scrubSensitiveData(data[key]);
                }
            }
        }
        return scrubbed;
    }

    return data;
};
