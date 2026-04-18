import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View, Button, Linking } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function DisplayInsets() {
  const insets = useSafeAreaInsets();
  return (
    <Text>
      Insets: {insets.bottom} - {insets.top}
    </Text>
  );
}

export default function App() {
  const onContactMe = () => {
    console.warn('Contact Me button clicked');
    Linking.openURL('mailto:soumadip.majila02@gmail.com');
  };

  // Safe area view practice:
  // return (
  //   <SafeAreaProvider>
  //     <SafeAreaView style={{ backgroundColor: 'red' }} edges={['top', 'bottom']}>
  //       <View
  //         style={{
  //           backgroundColor: 'palegreen',
  //           height: '100%',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Text style={{ fontSize: 100 }}>Title</Text>
  //         <DisplayInsets />
  //         <Text style={{ marginTop: 'auto' }}>Footer</Text>
  //       </View>
  //     </SafeAreaView>
  //   </SafeAreaProvider>
  // );

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1687726346756-4fb29bfc5797?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{ width: '100%', aspectRatio: 16 / 9 }}
            />
            <Image
              source={require('./assets/soumadip.png')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
                borderWidth: 5,
                borderColor: 'white',
                marginTop: -75,
              }}
            />
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Soumadip Majila</Text>
            <Text>React Native Learner</Text>
            <View style={{ flexDirection: 'row', marginVertical: 10, gap: 10 }}>
              <FontAwesome6 name="github" size={24} color="black" />
              <FontAwesome6 name="x-twitter" size={24} color="black" />
              <FontAwesome6 name="at" size={24} color="black" />
            </View>
            <Button title="Contact Me" onPress={onContactMe} />
            <Text style={{ padding: 10, fontSize: 16, lineHeight: 30 }}>
              I am Soumadip Majila, an MCA student from Dr. B. C. Roy Engineering College with a
              strong foundation in web development and a BCA background. I focus on building
              practical skills in technologies like React Native, JavaScript, and modern UI
              development while strengthening core computer science concepts such as Data
              Structures, Algorithms, DBMS, and Operating Systems. I enjoy creating clean,
              responsive, and user-friendly applications and continuously improving my coding
              practices through hands-on projects and experimentation. With academic experience
              supported by coursework in Object-Oriented Programming and system-level concepts, I
              aim to bridge the gap between theory and real-world application. I have a
              problem-solving mindset and a keen interest in learning new tools, frameworks, and
              development workflows that enhance productivity and code quality. I am currently
              exploring mobile app development using React Native and expanding my understanding of
              full-stack development. I am eager to gain professional experience where I can
              contribute, learn from experienced developers, and grow as a software engineer. My
              goal is to build scalable, efficient, and impactful applications while continuously
              evolving my technical and analytical skills in a collaborative environment.
            </Text>
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
