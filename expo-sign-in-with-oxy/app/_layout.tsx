import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { BloomThemeProvider } from '@oxy.so/bloom/theme';
import { OxyProvider } from '@oxy.so/services/ui/client';
import { OXY_API_URL, OXY_CLIENT_ID } from '../oxy-config';

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BloomThemeProvider>
          <OxyProvider baseURL={OXY_API_URL} clientId={OXY_CLIENT_ID}>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
          </OxyProvider>
        </BloomThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
