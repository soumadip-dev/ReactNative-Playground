import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

const audioSource = require('../../../assets/hello.mp3');

export default function AudioScreen() {
  // Existing audio player
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  // Recorder
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  // Recorded audio URI
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  // Player for recorded audio
  const recordedPlayer = useAudioPlayer(recordedUri);
  const recordedStatus = useAudioPlayerStatus(recordedPlayer);

  const handlePlay = () => {
    if (status.didJustFinish || (status.duration > 0 && status.currentTime >= status.duration)) {
      player.seekTo(0);
    }

    player.play();
  };

  const handlePause = () => {
    player.pause();
  };

  const handleReplay = () => {
    player.pause();
    player.seekTo(0);
    player.play();
  };

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();

    // Get the recorded audio file URI
    if (audioRecorder.uri) {
      setRecordedUri(audioRecorder.uri);
      console.log('Recorded audio:', audioRecorder.uri);
    }
  };

  const playRecordedAudio = () => {
    if (!recordedUri) return;

    if (
      recordedStatus.didJustFinish ||
      (recordedStatus.duration > 0 && recordedStatus.currentTime >= recordedStatus.duration)
    ) {
      recordedPlayer.seekTo(0);
    }

    recordedPlayer.play();
  };

  const pauseRecordedAudio = () => {
    recordedPlayer.pause();
  };

  const replayRecordedAudio = () => {
    recordedPlayer.pause();
    recordedPlayer.seekTo(0);
    recordedPlayer.play();
  };

  useEffect(() => {
    (async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission Denied', 'Permission to access microphone was denied.');
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Existing Audio Player */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Audio Player</Text>

        <Text style={styles.statusText}>Status: {status.playing ? 'Playing 🔊' : 'Paused ⏸️'}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handlePlay}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleReplay}>
            <Text style={styles.buttonText}>Replay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recorder */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Audio Recorder</Text>

        {recorderState.isRecording && (
          <View style={styles.recordingBadge}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Recording in progress...</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            recorderState.isRecording ? styles.recordStopButton : styles.recordStartButton,
          ]}
          onPress={recorderState.isRecording ? stopRecording : record}
        >
          <Text style={styles.recordButtonText}>
            {recorderState.isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recorded Audio Player */}
      {recordedUri && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recorded Audio</Text>

          <Text style={styles.statusText}>
            Status: {recordedStatus.playing ? 'Playing 🔊' : 'Paused ⏸️'}
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={playRecordedAudio}
            >
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={pauseRecordedAudio}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={replayRecordedAudio}
            >
              <Text style={styles.buttonText}>Replay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D1E',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
  },
  activeButton: {
    backgroundColor: '#1D4ED8',
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 14,
  },
  disabledButtonText: {
    color: '#94A3B8',
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  recordingText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  recordStartButton: {
    backgroundColor: '#EF4444',
  },
  recordStopButton: {
    backgroundColor: '#1E293B',
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
