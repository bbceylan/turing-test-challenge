import { RAW_QUESTIONS } from '../data/questions';

export interface TextPair {
    id: string;
    human: string;
    ai: string;
    category: string;
    aiModel: string;
}

export const MOCK_PAIRS: TextPair[] = RAW_QUESTIONS.map((q, index) => ({
    id: `q-${index + 1}`,
    ...q
}));

// Helper to getting unique categories
export const getCategories = () => {
    const categories = new Set(MOCK_PAIRS.map(p => p.category));
    return Array.from(categories).sort();
};

export const getRandomPair = (category?: string | string[]) => {
    let pool = MOCK_PAIRS;
    if (category) {
        if (Array.isArray(category)) {
            pool = MOCK_PAIRS.filter(p => category.includes(p.category));
        } else {
            pool = MOCK_PAIRS.filter(p => p.category === category);
        }
    }
    // Fallback if filtering yields no results (safety)
    if (pool.length === 0) pool = MOCK_PAIRS;

    return pool[Math.floor(Math.random() * pool.length)];
};
