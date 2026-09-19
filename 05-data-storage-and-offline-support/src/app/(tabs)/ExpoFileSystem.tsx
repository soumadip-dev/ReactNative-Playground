import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';

export default function ExpoFileSystem() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const appendLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleWriteAndReadPlainText = async () => {
    try {
      const targetFile = new File(Paths.document, 'test.txt');

      if (!targetFile.exists) {
        await targetFile.create();
        appendLog('📄 File created successfully.');
      }

      await targetFile.write('Hello World!');
      appendLog('✍️ Wrote "Hello World!" to test.txt');

      const fileContent = await targetFile.text();
      appendLog(`📖 File contents: "${fileContent}"`);
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleWriteAndReadBase64 = async () => {
    try {
      const targetFile = new File(Paths.document, 'base64.txt');

      if (!targetFile.exists) {
        await targetFile.create();
        appendLog('📄 File created successfully.');
      }

      await targetFile.write('Content to be encoded in base64');
      appendLog('✍️ Wrote "Content to be encoded in base64" to base64.txt');

      const base64Content = await targetFile.base64();
      appendLog(`📖 File Base64 (preview): "${base64Content.substring(0, 30)}..."`);

      const decodedText = atob(base64Content);
      appendLog(`📖 Decoded Original Text: "${decodedText}"`);
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCopyFile = async () => {
    try {
      const sourceFile = new File(Paths.document, 'base64.txt');

      if (sourceFile.exists) {
        const destinationFile = new File(Paths.cache, 'copy.txt');
        await sourceFile.copy(destinationFile);
        appendLog('📋 File copied successfully to cache directory.');
      } else {
        appendLog('⚠️ Source file (base64.txt) does not exist to copy.');
      }
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUploadFile = async () => {
    setIsUploading(true);
    try {
      const uploadFile = new File(Paths.cache, 'upload.txt');

      if (!uploadFile.exists) {
        await uploadFile.create();
      }

      await uploadFile.write('Sample data for network upload test');
      appendLog('✍️ Created and prepared upload.txt for uploading.');

      const formData = new FormData();
      formData.append('file', uploadFile as unknown as Blob);

      appendLog('🚀 Uploading file to httpbin.org...');
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        appendLog(`✅ Upload successful! Response status: ${response.status}`);
      } else {
        appendLog(`⚠️ Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleListDirectory = async () => {
    try {
      const directory = new Directory(Paths.document);
      const items = directory.list();
      const itemNames = items.map(item => item.name);
      appendLog(`📁 Directory contents: ${itemNames.length > 0 ? itemNames.join(', ') : 'Empty'}`);
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const targetFile = new File(Paths.document, 'test.txt');

      if (targetFile.exists) {
        await targetFile.delete();
        appendLog('🗑️ File (test.txt) deleted successfully.');
      } else {
        appendLog('⚠️ File (test.txt) does not exist.');
      }
    } catch (error) {
      appendLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>Local Storage</Text>
      <Text style={styles.title}>📦 File System</Text>
      <Text style={styles.subtitle}>Test reading, writing, and uploading text files</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleWriteAndReadPlainText}
        >
          <Text style={styles.buttonText}>Write & Read Plain Text</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonSecondary,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleWriteAndReadBase64}
        >
          <Text style={styles.buttonText}>Write & Read Base64</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonTertiary,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleCopyFile}
        >
          <Text style={styles.buttonText}>Copy Base64 File</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonUpload,
            isUploading && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleUploadFile}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Upload File to Server</Text>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonInfo,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleListDirectory}
        >
          <Text style={styles.buttonText}>List Document Directory</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonDanger,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleDeleteFile}
        >
          <Text style={styles.buttonText}>Delete Plain Text File</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.clearButton, pressed && styles.buttonPressed]}
          onPress={handleClearLogs}
        >
          <Text style={styles.clearButtonText}>Clear Logs</Text>
        </Pressable>
      </View>

      {/* Terminal Console Box */}
      <View style={styles.logWrapper}>
        <View style={styles.logHeaderContainer}>
          <Text style={styles.logHeader}>Operation Logs</Text>
          <Text style={styles.logBadge}>{logs.length}</Text>
        </View>
        <ScrollView
          style={styles.logContainer}
          contentContainerStyle={styles.logContent}
          nestedScrollEnabled
        >
          {logs.length === 0 ? (
            <Text style={styles.emptyLog}>No logs yet. Press a button above to test.</Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {`> ${log}`}
              </Text>
            ))
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  eyebrow: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#38bdf8',
    marginBottom: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#0891b2',
    shadowColor: '#0891b2',
  },
  buttonTertiary: {
    backgroundColor: '#0d9488',
    shadowColor: '#0d9488',
  },
  buttonUpload: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
  },
  buttonInfo: {
    backgroundColor: '#4f46e5',
    shadowColor: '#4f46e5',
  },
  buttonDanger: {
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  clearButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  clearButtonText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  logWrapper: {
    height: 240,
    backgroundColor: '#030712',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
  },
  logHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  logHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  logBadge: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  logContainer: {
    flex: 1,
  },
  logContent: {
    gap: 8,
  },
  logText: {
    color: '#f1f5f9',
    fontSize: 13,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  emptyLog: {
    color: '#64748b',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
