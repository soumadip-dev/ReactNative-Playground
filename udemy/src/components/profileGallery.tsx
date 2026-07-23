import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface User {
  name: string;
  email: string;
  picture: string;
  id: string;
}

const ProfileGallery = () => {
  const uri = 'https://randomuser.me/api/?results=90';

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const fetchUsers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setUsers([]);
      const response = await axios.get(uri);
      const { results } = response.data;

      const Users = results.map((user: any) => {
        const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
        const email = user.email;
        const picture = user.picture.large;
        const id = user.id.value;

        return { name, email, picture, id };
      });
      setUsers(Users);
    } catch (error: unknown) {
      setUsers([]);
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loaderContainer, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.loaderContainer, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <Text
          style={{ color: isDarkMode ? '#fff' : '#000', textAlign: 'center', marginHorizontal: 20 }}
        >
          {error}
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={[{ flex: 1 }, isDarkMode ? styles.darkBg : styles.lightBg]}>
      <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={(item, index) => item?.id + index}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0' }]}>
              <Image source={{ uri: item?.picture }} style={styles.avatar} />
              <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>
                {item?.name}
              </Text>
              <Text style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}>
                {item?.email}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileGallery;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  darkBg: {
    backgroundColor: '#121212',
  },
  lightBg: {
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#1e1e1e',
    margin: 10,
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#bbb',
  },
});
