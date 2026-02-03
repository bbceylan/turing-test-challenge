module.exports = {
    preset: "react-native",
    setupFilesAfterEnv: ["./src/setupTests.js"],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@supabase/.*|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|expo-sqlite|expo-file-system|expo-constants|lucide-react-native|expo-blur|expo-haptics|expo-notifications))"
    ],
    testMatch: ["**/?(*.)+(test|spec).[jt]s?(x)"]
};
