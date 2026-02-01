# Agent Knowledge Base: Turing Test App

## Project Overview
A React Native (Expo) game where users guess between human-written and AI-generated text.

## Tech Stack Quick-Start
- **State**: Zustand (`src/store/useStore.ts`)
- **DB**: Expo SQLite (`src/db/client.ts`)
- **UI**: Vanilla `StyleSheet` with Synthwave palette (Navy, Purple, Cyan, Pink).
- **Auth**: Supabase (`src/utils/supabase.ts`)
- **Navigation**: React Navigation Bottom Tabs.

## Key Learnings & Decisions
- **Offline-First**: All XP/Streak logic happens locally in SQLite first. Supabase is intended for secondary sync/leaderboards.
- **SQLite Performance**: Using `expo-sqlite`'s async API. Ensure `initDb` is called once at App startup.
- **Aesthetic**: "AI Slop" / Synthwave style is a hard requirement. Use high-contrast colors and semi-transparent "glass" cards.
- **Milestones**: Achievement logic is integrated into the Zustand store's `addXp` action to ensure atomicity between score updates and achievement checks.

## Current Status
- MVP complete (Play, Leaderboard, Achievements, Profile).
- Auth integrated via Supabase.
- Navigation structure finalized.

## Next Steps for Future Agents
- Replace Supabase placeholder keys in `src/utils/supabase.ts`.
- Implement actual ad providers (`react-native-google-mobile-ads`).
- Add RevenueCat initialization.
- Enhance the TextPair source (currently using `mockData.ts`).
