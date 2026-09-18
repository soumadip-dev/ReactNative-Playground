import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/index.styles';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconBadge}>
        <Text style={styles.emptyIcon}>📝</Text>
      </View>
      <Text style={styles.emptyText}>No notes yet</Text>
      <Text style={styles.emptySubText}>Tap the + button to create your first note</Text>
    </View>
  );
};
