# Roadmap - Turing Test App

## Phase 1: MVP (Completed)
- [x] Core Gameplay: Text comparison UI.
- [x] Scoring System: XP, Streaks, and Milestones.
- [x] Local Storage: SQLite integration for offline play.
- [x] Initial Design: Synthwave (Purple/Pink/Navy) theme.

## Phase 2: Competition & Social (In Progress)
- [x] Accounts: Supabase Auth integration (Guest Mode supported).
- [x] Leaderboard: Global and weekly rankings (Guest Mode supported).
- [x] Push Notifications: Daily challenges and streak reminders.

## Phase 3: Monetization & Polish (Completed)
- [x] Ads: Interstitial and banner ads (Test IDs configured).
- [x] RevenueCat: "Pro" subscription to remove ads (Pending real keys).
- [x] Widgets: Streak and daily stats on home screen.

## Phase 4: Future Expansion
- [ ] Tournaments: Real-time or asynchronous competitions.
- [ ] Invite Friends: Challenge specific users to a Turing duel.
- [ ] AI Models: Categorize texts by the AI model used.

## Phase 5: Privacy & Safety (Completed)
- [x] Data Scrubbing: Ensure no journal content ever leaves device.
- [x] Crash Reporting: Mask sensitive strings in logs.
- [x] Local Encryption: Encrypt SQLite database at rest (Optional post-MVP).

## Phase 8: Architecture & UX Polish (Completed)
- [x] Architecture: Extract game logic (`useGameLogic`) and Semantic Theming (`useTheme`).
- [x] UX: Haptics (Streak milestones) and Animations (Reanimated).

## Phase 6: Production & Hardening (Completed)
- [x] Configuration: Validated via `app.json` (Privacy Manifests included).
- [x] Apple Store Compliance: Privacy Manifest configured for UserDefaults/FileTimestamp.
- [x] Release: Version bumped to 1.0.1. Ready for build.

## Phase 11: Polish & Accessibility (In Progress)
- [ ] Accessibility: Ensure screen reader support and dynamic type scaling.
- [ ] Polish: Improve loading states and error recovery UX.
