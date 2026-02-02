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
    },
    {
        id: '3',
        category: 'Coding',
        human: "I hate it when dependencies break my build. It feels like the whole house of cards is collapsing.",
        ai: "Dependency conflicts can be frustrating. Ensuring version pinning and clean environments usually mitigates stability risks.",
        aiModel: 'Llama 3'
    },
    {
        id: '4',
        category: 'Humor',
        human: "Why did the scarecrow win an award? Because he was outstanding in his field!",
        ai: "The scarecrow was recognized for his excellence in agricultural protection and standing still.",
        aiModel: 'Gemini 1.5 Pro'
    },
    {
        id: '5',
        category: 'Empathy',
        human: "I'm feeling really overwhelmed today. Everything seems to be going wrong at once.",
        ai: "I understand. It is common to feel stress when multiple stressors converge. Have you tried breathing exercises?",
        aiModel: 'GPT-4o'
    },
    {
        id: '6',
        category: 'Abstract',
        human: "Blue tastes like a cold metal spoon on a winter morning.",
        ai: "Blue represents a wavelength of approximately 450-495 nanometers and is often associated with sadness or calm.",
        aiModel: 'Grok-1'
    },
    {
        id: '7',
        category: 'Romance',
        human: "Love isn't just a feeling, it's the quiet promise to stay when the feeling hides.",
        ai: "Romantic affection involves neurochemical bonding and long-term partner retention strategies.",
        aiModel: 'Claude 3 Opus'
    },
    {
        id: '8',
        category: 'Culinary',
        human: "The garlic needs to sizzle just until it smells like a Sunday afternoon at nonna's.",
        ai: "Sauté the garlic for 30-60 seconds until aromatic, being careful not to reach the smoke point.",
        aiModel: 'Mistral Large'
    }
];

export const getRandomPair = () => {
    return MOCK_PAIRS[Math.floor(Math.random() * MOCK_PAIRS.length)];
};
