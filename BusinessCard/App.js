import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

//* custom component to show my projects
const ProjectCard = ({ image, name, url }) => {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(url);
      }}
    >
      <View style={{ marginHorizontal: 5 }}>
        <Image
          source={image}
          style={{
            height: 150,
            width: 200,
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
          }}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 16,
            color: '#333',
            marginTop: 8,
            maxWidth: 200,
          }}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

//* custom component to show the insets value
const ShowInsets = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>Insets Bottom: {insets.bottom}</Text>
      <Text>Insets Top: {insets.top}</Text>
    </View>
  );
};

export default function App() {
  const name = 'Soumadip Majila';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const contactMe = () => {
    Linking.openURL('mailto:soumadipmajila@gmail.com');
  };

  const whoIam = () => {
    Alert.alert('Soumadip Majila', 'MCA Graduate (2025)\nWeb Development Enthusiast', [
      { text: 'OK' },
    ]);
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/soumadip-dev');
  };

  const openTwitter = () => {
    Linking.openURL('https://x.com/SoumadipMajila');
  };

  const openWebsite = () => {
    Linking.openURL('https://soumadip.vercel.app/');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2600fc" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg',
              }}
              style={styles.headerImage}
            />

            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Image source={require('./assets/soumadip.jpg')} style={styles.profileImage} />
              </View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.title}>MCA Graduate – 2025 | Aspiring Web Developer</Text>

              <View style={styles.socialContainer}>
                <FontAwesome6
                  name="github"
                  size={28}
                  color="#333"
                  onPress={openGitHub}
                  style={styles.socialIcon}
                />
                <FontAwesome6
                  name="x-twitter"
                  size={28}
                  color="#333"
                  onPress={openTwitter}
                  style={styles.socialIcon}
                />
                <FontAwesome6
                  name="at"
                  size={28}
                  color="#333"
                  onPress={openWebsite}
                  style={styles.socialIcon}
                />
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                  <Button title="Who I Am" onPress={whoIam} color="#2600fc" />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Contact Me" onPress={contactMe} color="#fc0015" />
                </View>
              </View>
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>
                I am an MCA graduate (2025) with a BCA background and a strong foundation in web
                development. I have academic and practical exposure to Database Management Systems,
                Operating Systems, Data Structures, Object-Oriented Programming, and Java. I am
                eager to gain real-world experience, enhance my technical skills, and grow as a
                professional web developer. I enjoy learning new technologies and applying them to
                build clean, efficient, and user-focused applications.
              </Text>
            </View>

            <View style={styles.projectsContainer}>
              <Text style={styles.projectsTitle}>My Projects</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.projectsScrollContent}
              >
                <ProjectCard
                  image={require('./assets/projects/project1.png')}
                  name="BiteBox"
                  url={'https://github.com/soumadip-dev/BiteBox-MERN'}
                />
                <ProjectCard
                  image={require('./assets/projects/project2.png')}
                  name="Veda Cli"
                  url={'https://github.com/soumadip-dev/VedaCLI-MERN'}
                />
                <ProjectCard
                  image={require('./assets/projects/project3.png')}
                  name="Logiqo"
                  url={'https://github.com/soumadip-dev/Logiqo-PERN'}
                />
                <ProjectCard
                  image={require('./assets/projects/project4.png')}
                  name="Crafty.ai"
                  url={'https://github.com/soumadip-dev/Crafty.ai-MERN'}
                />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  headerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -70,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: '#fff',
    borderWidth: 5,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 15,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  title: {
    fontSize: 15,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    gap: 30,
  },
  socialIcon: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    gap: 20,
  },
  buttonWrapper: {
    minWidth: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bioContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    marginHorizontal: 15,
    borderRadius: 12,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#444',
  },
  projectsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  projectsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  projectsScrollContent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 15,
  },
});
