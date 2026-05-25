import { useCallback, useMemo } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OxySignInButton, useOxy } from '@oxyhq/services';

export default function HomeScreen() {
  const { isAuthenticated, user, logout } = useOxy();

  const displayName = useMemo(() => {
    if (!user) return null;
    const full = user.name?.full;
    const firstLast = [user.name?.first, user.name?.last]
      .filter(Boolean)
      .join(' ')
      .trim();
    return full || firstLast || user.username || user.email || 'Oxy user';
  }, [user]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to sign out', error);
      Alert.alert(
        'Sign out failed',
        'Something went wrong. Check the console for details.',
      );
    }
  }, [logout]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Sign in with Oxy</Text>
          <Text style={styles.subtitle}>
            Expo + Expo Router + @oxyhq/services.
          </Text>
        </View>

        <View style={styles.card}>
          {isAuthenticated && user ? (
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
                Tap the button below to open the Oxy sign-in flow. It runs as
                a native bottom sheet on iOS / Android and as a full-screen
                modal on web.
              </Text>
              <OxySignInButton variant="contained" />
            </>
          )}
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
