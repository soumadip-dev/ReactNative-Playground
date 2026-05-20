import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface QRCodeButton {
  handleOpenQRCode: () => void;
}
export default function QRCodeButton({ handleOpenQRCode }: QRCodeButton) {
  return (
    <TouchableOpacity onPress={handleOpenQRCode} style={styles.container}>
      <MaterialIcons name="qr-code" size={32} color="white" />
      <Text style={styles.text}>QR Code Detected</Text>
      <MaterialIcons name="chevron-right" size={20} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
