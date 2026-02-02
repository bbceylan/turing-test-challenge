# Turing Test: Human vs AI

A mindful challenge to distinguish between human creativity and AI-generated text.

## Features
- **The Challenge**: Compare two texts and guess which is human-written.
- **Ritual XP**: Earn points and maintain streaks for correct guesses.
- **Leaderboards**: Compete globally or weekly via Supabase-powered leaderboards.
- **Offline-First**: Practice and play offline; sync when you're back.
- **Guest Mode**: Play immediately without signing up. Create an account later to sync stats.
- **Premium Experience**: Ad-supported with a clean "AI Slop" / Synthwave aesthetic. Subscription for ad-free play.

## Architecture
- **Offline-First**: The app is designed to work completely offline. Local user data (XP, streaks, history) is stored in SQLite (`expo-sqlite`).
- **Sync**: When online, data syncs to Supabase for global leaderboards and multi-device support (auth required). Guest Mode keeps data local only.
- **Privacy**: No user journal entries or private text are ever sent to the cloud. Only aggregate stats (XP, high scores) are synced.

## Tech Stack
- **Framework**: React Native + Expo (Managed Workflow)
- **State Management**: Zustand (UI state), SQLite (Persisted Data)
- **Local DB**: Expo SQLite
- **Backend**: Supabase (Auth & Leaderboard)
- **Monetization**: RevenueCat (Subscriptions) & Google Mobile Ads
- **Styling**: Vanilla CSS (or StyleSheet.create) with a Synthwave palette.

## Prerequisites
- **Node.js**: LTS version (v18+ recommended)
- **Watchman**: Recommended for better file watching performance (`brew install watchman`)
- **Expo Go**: Install the Expo Go app on your iOS/Android device.

## Configuration
The app requires environment variables for external services. Initialize these before building or running.

1. **Supabase**: Update `src/utils/supabase.ts` or set env vars for:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
2. **AdMob**: Configure App IDs in `app.json`:
   - `androidAppId`
   - `iosAppId`

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Prebuild (Required for Native Modules)**
   This project uses native modules (`react-native-google-mobile-ads`, `react-native-purchases`) which act as custom native code.
   ```bash
   npx expo prebuild
   ```

3. **Run the App**
   ```bash
   # IOS (Simulator)
   npm run ios

   # Android (Emulator)
   npm run android

   # Development Build (Physical Device)
   npx expo start --dev-client
   ```

