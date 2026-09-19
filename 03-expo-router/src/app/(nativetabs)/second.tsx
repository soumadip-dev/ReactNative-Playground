import { StyleSheet, Text, View } from 'react-native';

export default function SettingsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>

        <View>
          <Text style={styles.name}>Soumadip</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <View style={styles.item}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.itemText}>Account</Text>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🔔</Text>
          <Text style={styles.itemText}>Notifications</Text>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🌙</Text>
          <Text style={styles.itemText}>Appearance</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    padding: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#431407',
    marginTop: 40,
    marginBottom: 25,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  email: {
    color: '#78716C',
    marginTop: 4,
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  icon: {
    fontSize: 20,
    width: 40,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#292524',
  },
  arrow: {
    fontSize: 25,
    color: '#A8A29E',
  },
});
