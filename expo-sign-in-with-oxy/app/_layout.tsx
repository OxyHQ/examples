import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BloomProvider } from '@oxy.so/bloom/provider';
import { OxyProvider } from '@oxy.so/services/ui/client';
import { OXY_API_URL, OXY_CLIENT_ID } from '../oxy-config';

export default function RootLayout() {
  return (
    <BloomProvider>
      <OxyProvider baseURL={OXY_API_URL} clientId={OXY_CLIENT_ID}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </OxyProvider>
    </BloomProvider>
  );
}
