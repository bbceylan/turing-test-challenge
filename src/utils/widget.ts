import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const WIDGET_DATA_PATH = `${FileSystem.documentDirectory}widget_data.json`;

export const updateWidgetData = async (stats: { currentStreak: number, totalXp: number }) => {
    try {
        const data = JSON.stringify(stats);
        await FileSystem.writeAsStringAsync(WIDGET_DATA_PATH, data);
        console.log('Widget data updated:', stats);

        // On iOS/Android, you'd typically use a native module to trigger a widget refresh here.
        // For now, we prepare the data.
    } catch (error) {
        console.error('Error updating widget data:', error);
    }
};
