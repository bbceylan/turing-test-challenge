---
description: How to build the iOS app
---

# iOS Build Workflow

This workflow guides you through the process of building the Unravel iOS app.

## Prerequisites
- [x] EAS CLI installed (`npm install -g eas-cli`)
- [x] `eas.json` configured (Done)
- [x] Apple Developer Account (for production/internal distribution)

## Build Commands

### 1. Verification
Ensure dependencies are correct before building.
```bash
npx expo install --check
```

### 2. Development Build (Simulator)
Build a simulator-compatible binary for local testing.
```bash
eas build --platform ios --profile development --local
```

### 3. Production Build (App Store)
Build for TestFlight or App Store distribution.
```bash
eas build --platform ios --profile production
```

## Troubleshooting
- If build fails on `pod install`, try `rm -rf ios && npx expo prebuild --clean`.
- Ensure you are logged in to EAS: `eas login`.
