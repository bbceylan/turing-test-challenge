export interface TextPair {
    id: string;
    human: string;
    ai: string;
    category: string;
    aiModel: string;
}

export const MOCK_PAIRS: TextPair[] = [
    {
        id: '1',
        category: 'Philosophy',
        human: "The meaning of life is not something we find, but something we create through our choices and relationships.",
        ai: "Life's purpose is an emergent property of conscious experience, defined by the subjective values we assign to our actions.",
        aiModel: 'GPT-4o'
    },
    {
        id: '2',
        category: 'Poetry',
        human: "The stars are but cold eyes watching our small drama unfold on a stage of dust.",
        ai: "Luminous orbs of hydrogen and fire, indifferent to the whispers of a pale blue dot.",
        aiModel: 'Claude 3.5 Sonnet'
    }
];

export const getRandomPair = () => {
    return MOCK_PAIRS[Math.floor(Math.random() * MOCK_PAIRS.length)];
};
