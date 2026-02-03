export interface ThemePack {
    id: string;
    title: string;
    subtitle: string;
    categories: string[];
}

export const THEME_PACKS: ThemePack[] = [
    {
        id: 'neon-noir',
        title: 'Neon Noir',
        subtitle: 'Literature, History, Philosophy',
        categories: ['Literature', 'History', 'Philosophy']
    },
    {
        id: 'mythic-core',
        title: 'Mythic Core',
        subtitle: 'Fantasy, Religious, Horror',
        categories: ['Fantasy', 'Religious', 'Horror']
    },
    {
        id: 'signal-drift',
        title: 'Signal Drift',
        subtitle: 'Science, Pop Culture, Horror',
        categories: ['Science', 'Pop Culture', 'Horror']
    },
];
