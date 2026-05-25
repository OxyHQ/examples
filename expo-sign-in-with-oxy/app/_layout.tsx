import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { OxyProvider } from '@oxyhq/services';

/**
 * Required env var:
 *   EXPO_PUBLIC_OXY_API_URL = "https://api.oxy.so"   (or your own Oxy API)
 */
const API_URL =
  process.env.EXPO_PUBLIC_OXY_API_URL ?? 'https://api.oxy.so';

/**
 * `expo-linking.createURL('/')` builds the redirect URI the Oxy auth web flow
 * will deep-link back to. In development this is e.g.
 *   exp://192.168.1.42:8081/--/
 * In a standalone build it becomes:
 *   oxyexample://
 * (the `scheme` we declared in app.json).
 */
const AUTH_REDIRECT_URI = Linking.createURL('/');

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OxyProvider baseURL={API_URL} authRedirectUri={AUTH_REDIRECT_URI}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </OxyProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
