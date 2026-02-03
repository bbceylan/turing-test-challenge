import { getDb } from '../db/client';
import { MOCK_PAIRS, TextPair } from './mockData';

export interface DailyStatus {
    dateKey: string;
    completed: boolean;
    correct: boolean;
    xpEarned: number;
}

export const getLocalDateKey = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const hashString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
};

const pickDeterministicPair = (dateKey: string) => {
    if (MOCK_PAIRS.length === 0) {
        throw new Error('No text pairs available for daily challenge.');
    }
    const idx = hashString(dateKey) % MOCK_PAIRS.length;
    return MOCK_PAIRS[idx];
};

export const getDailyChallenge = async (dateKey: string) => {
    const db = await getDb();
    const existing = await db.getFirstAsync<{
        pair_id: string;
        category?: string;
        completed_at?: string;
        correct?: number;
        xp_earned?: number;
    }>('SELECT pair_id, category, completed_at, correct, xp_earned FROM daily_challenges WHERE date = ?', [dateKey]);

    let pair: TextPair | undefined;
    if (existing?.pair_id) {
        pair = MOCK_PAIRS.find(p => p.id === existing.pair_id);
    }

    if (!pair) {
        const selected = pickDeterministicPair(dateKey);
        pair = selected;
        await db.runAsync(
            'INSERT OR REPLACE INTO daily_challenges (date, pair_id, category) VALUES (?, ?, ?)',
            [dateKey, selected.id, selected.category]
        );
    }

    const status: DailyStatus = {
        dateKey,
        completed: !!existing?.completed_at,
        correct: !!existing?.correct,
        xpEarned: existing?.xp_earned ?? 0,
    };

    return { pair, status };
};

export const completeDailyChallenge = async (dateKey: string, correct: boolean, xpEarned: number) => {
    const db = await getDb();
    await db.runAsync(
        'UPDATE daily_challenges SET completed_at = CURRENT_TIMESTAMP, correct = ?, xp_earned = ? WHERE date = ?',
        [correct ? 1 : 0, xpEarned, dateKey]
    );
};

export const getDailyStatus = async (dateKey: string) => {
    const db = await getDb();
    const result = await db.getFirstAsync<{
        completed_at?: string;
        correct?: number;
        xp_earned?: number;
    }>('SELECT completed_at, correct, xp_earned FROM daily_challenges WHERE date = ?', [dateKey]);

    return {
        dateKey,
        completed: !!result?.completed_at,
        correct: !!result?.correct,
        xpEarned: result?.xp_earned ?? 0,
    } as DailyStatus;
};
