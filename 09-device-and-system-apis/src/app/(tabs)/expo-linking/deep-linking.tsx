import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

// Explicit TypeScript Interface for received links
interface ReceivedUrlItem {
  url: string;
  parsed: Linking.ParsedURL;
  timestamp: string;
}

export default function DeepLinking() {
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [receivedUrls, setReceivedUrls] = useState<ReceivedUrlItem[]>([]);

  useEffect(() => {
    // 1. Fetch initial URL that opened the app
    Linking.getInitialURL().then(url => {
      if (url) {
        setInitialUrl(url);
        handleDeepLink(url);
      }
    });

    // 2. Listen for incoming deep links while app is open
    const subscription = Linking.addEventListener('url', event => {
      console.log('Received URL:', event.url);
      handleDeepLink(event.url);
    });

    return () => subscription.remove();
  }, []);

  const handleDeepLink = (url: string) => {
    const parsed = Linking.parse(url);

    console.log('Parsed URL:', parsed);
    console.log('Scheme:', parsed.scheme);
    console.log('Hostname:', parsed.hostname);
    console.log('Path:', parsed.path);
    console.log('Query params:', parsed.queryParams);

    setReceivedUrls(prev => [
      {
        url,
        parsed,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    // Example path routing logic
    if (parsed.path === 'product') {
      const productId = parsed.queryParams?.id;
      console.log('Navigate to product:', productId);
    } else if (parsed.path === 'profile') {
      const userId = parsed.queryParams?.userId;
      console.log('Navigate to profile:', userId);
    }
  };

  // Create an example deep link URL for testing
  const appUrl = Linking.createURL('product', {
    queryParams: { id: '123', name: 'Cool Product' },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Deep Linking</Text>

      {/* Generated Deep Link Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Generated Test URL</Text>
        <Text style={styles.urlText}>{appUrl}</Text>
        <Text style={styles.hintText}>
          Copy and paste this URL into a browser or terminal to trigger a deep link into this app.
        </Text>
      </View>

      {/* Initial URL Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Initial Launch URL</Text>
        <Text style={styles.infoValue}>
          {initialUrl ? initialUrl : 'App was opened directly (no deep link)'}
        </Text>
      </View>

      {/* History Log */}
      <Text style={styles.sectionTitle}>Received Links History</Text>

      {receivedUrls.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No deep links received yet.</Text>
        </View>
      ) : (
        receivedUrls.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              <Text style={styles.pathBadge}>/{item.parsed.path || 'home'}</Text>
            </View>

            <Text style={styles.rawUrl}>{item.url}</Text>

            {item.parsed.queryParams && Object.keys(item.parsed.queryParams).length > 0 && (
              <View style={styles.queryParamsContainer}>
                <Text style={styles.queryParamsTitle}>Params:</Text>
                <Text style={styles.queryParamsText}>
                  {JSON.stringify(item.parsed.queryParams, null, 2)}
                </Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginTop: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  urlText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  hintText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  pathBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  rawUrl: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  queryParamsContainer: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
  },
  queryParamsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  queryParamsText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#334155',
  },
});
