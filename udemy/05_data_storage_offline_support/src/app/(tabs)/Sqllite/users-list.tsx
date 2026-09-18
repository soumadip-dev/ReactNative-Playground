import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { deleteUser, getUsers, User } from '@/db/crud';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      await loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Header / Action Bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Users Directory</Text>
          <Text style={styles.headerSubtitle}>{users.length} registered</Text>
        </View>
        <Link href="/Sqllite/create-user" style={styles.createButton}>
          <Text style={styles.createButtonIcon}>➕</Text>
          <Text style={styles.createButtonText}>Add User</Text>
        </Link>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name?.charAt(0).toUpperCase() || '?'}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No users found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f8fafc',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#0891b2',
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonIcon: {
    fontSize: 14,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyCreateButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  content: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#030712',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#e0e7ff',
    fontSize: 16,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  userEmail: {
    fontSize: 13,
    color: '#94a3b8',
  },
  deleteButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#dc2626',
  },
  deleteButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
});
