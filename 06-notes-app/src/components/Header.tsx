import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/styles/index.styles';

interface HeaderProps {
  count: number;
  onAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ count, onAdd }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Notes</Text>
        <Text style={styles.headerSubtitle}>
          {count} {count === 1 ? 'note' : 'notes'} saved
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAdd} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
