import { useCallback } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OxySignInButton, useAuth } from '@oxy.so/services';
import { getNormalizedUserHandle } from '@oxy.so/core';
import { OXY_REDIRECT_URI } from '../oxy-config';

export default function HomeScreen() {
  const { isAuthenticated, isLoading, user, signOut, error } = useAuth();
  const displayName = user
    ? user.name?.displayName ?? getNormalizedUserHandle(user)
    : null;

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      // The hook exposes the failure while preserving the current session.
      Alert.alert(
        'Sign out failed',
        'Something went wrong. Please try again.',
      );
    }
  }, [signOut]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sign in with Oxy</Text>
          <Text style={styles.subtitle}>
            Expo + Expo Router + @oxy.so/services.
          </Text>
        </View>

        <View style={styles.card}>
          {isLoading ? (
            <Text style={styles.muted}>Checking your session…</Text>
          ) : isAuthenticated && user ? (
            <>
              <Text style={styles.cardTitle}>You're signed in</Text>
              <Text style={styles.muted}>Welcome back,</Text>
              <Text style={styles.body}>{displayName}</Text>
              {user.email ? (
                <Text style={styles.muted}>{user.email}</Text>
              ) : null}
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.button,
                  styles.buttonSecondary,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Sign out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>You're signed out</Text>
              <Text style={styles.muted}>
                Tap below to open Oxy authorization for this registered app.
                The SDK completes OAuth and keeps the session in memory.
              </Text>
              <OxySignInButton
                oauthRedirectUri={OXY_REDIRECT_URI}
                nativeOAuthCompletion="sdk"
              />
            </>
          )}
          {error ? <Text accessibilityRole="alert" style={styles.muted}>{error}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0b0b10',
  },
  scroll: {
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 6,
  },
  title: {
    color: '#f5f5fa',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#9b9bad',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#15151d',
    borderColor: '#2a2a36',
    borderWidth: 1,
    borderRadius: 14,
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    color: '#f5f5fa',
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    color: '#f5f5fa',
    fontSize: 16,
    fontWeight: '600',
  },
  muted: {
    color: '#9b9bad',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: '#2a2a36',
    borderWidth: 1,
    borderColor: '#34344a',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#f5f5fa',
    fontSize: 14,
    fontWeight: '600',
  },
});
