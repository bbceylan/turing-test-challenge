const DEFAULT_HINTS = [
    'AI text often over-explains or uses oddly formal phrasing.',
    'Humans tend to include small imperfections and personal tone.',
    'Look for unnaturally even cadence or overly polished structure.',
];

const CATEGORY_HINTS: Record<string, string[]> = {
    Literature: [
        'AI paraphrases can feel too neat, with fewer quirks of voice.',
        'Human lines often carry subtle rhythm or intentional ambiguity.',
    ],
    Philosophy: [
        'AI tends to define terms repeatedly instead of pushing an argument.',
        'Human arguments can take bolder leaps or rhetorical twists.',
    ],
    Science: [
        'AI explanations are often precise but lack real-world texture.',
        'Humans may use analogies that feel lived-in or uneven.',
    ],
    History: [
        'AI summaries can be overly neutral or generalized.',
        'Humans sometimes inject judgment or specific detail.',
    ],
    Fantasy: [
        'AI fantasy can be vivid but generic in naming and tone.',
        'Human fantasy often has idiosyncratic imagery.',
    ],
    Horror: [
        'AI horror can be descriptive but emotionally flat.',
        'Humans might imply fear through subtext and pacing.',
    ],
    Religious: [
        'AI may mimic scripture but misses human cadence.',
        'Human passages often have distinct stylistic fingerprints.',
    ],
    'Pop Culture': [
        'AI tends to flatten slang into neutral phrasing.',
        'Humans use timing and cultural shorthand more naturally.',
    ],
};

export const getHintForCategory = (category?: string) => {
    if (!category) return DEFAULT_HINTS[0];
    const list = CATEGORY_HINTS[category];
    if (!list || list.length === 0) return DEFAULT_HINTS[0];
    return list[Math.floor(Math.random() * list.length)];
};
