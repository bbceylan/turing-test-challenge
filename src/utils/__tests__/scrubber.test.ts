import { scrubSensitiveData } from '../scrubber';

describe('scrubSensitiveData', () => {
    it('returns null/undefined as is', () => {
        expect(scrubSensitiveData(null)).toBeNull();
        expect(scrubSensitiveData(undefined)).toBeUndefined();
    });

    it('returns primitives as is', () => {
        expect(scrubSensitiveData(123)).toBe(123);
        expect(scrubSensitiveData('safe string')).toBe('safe string');
        expect(scrubSensitiveData(true)).toBe(true);
    });

    it('redacts sensitive keys in object', () => {
        const input = {
            id: 1,
            password: 'secret',
            username: 'agent',
            email: 'test@example.com',
        };
        const output = scrubSensitiveData(input);
        expect(output).toEqual({
            id: 1,
            password: '[REDACTED]',
            username: 'agent',
            email: '[REDACTED]',
        });
    });

    it('redacts nested objects', () => {
        const input = {
            meta: {
                apiKey: '12345',
                notes: 'private note',
            }
        };
        const output = scrubSensitiveData(input);
        expect(output.meta.apiKey).toBe('[REDACTED]');
        expect(output.meta.notes).toBe('[REDACTED]');
    });

    it('redacts arrays of objects', () => {
        const input = [{ content: 'journal' }, { id: 2 }];
        const output = scrubSensitiveData(input);
        expect(output[0].content).toBe('[REDACTED]');
        expect(output[1].id).toBe(2);
    });
});
