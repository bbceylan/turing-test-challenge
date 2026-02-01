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
- **Sync Logic**: Supabase `profiles` table acts as the remote leaderboard source. Always sync after a successful XP gain if a session exists.
- **Monetization**: `react-native-google-mobile-ads` handles ads. All ad visibility is gated by `useStore`'s `isPro` state.
- **Widgets**: Data is shared via `FileSystem.writeAsStringAsync` to `widget_data.json`. Future widget implementations should read from this file.
- **UI/UX**: Haptics via `expo-haptics` and animations via `react-native-reanimated` (Scanline effect).

## Current Status
- MVP complete.
- Phase 2 (Social) complete.
- Phase 3 (Monetization & Polish) complete.

## Next Steps for Future Agents
- Finish Phase 4 (Tournaments & AI categorization).
- Replace all placeholder AdMob and RevenueCat IDs with real credentials.
- Enhance the TextPair source (currently using `mockData.ts`).
