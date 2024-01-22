import { ToastAndroid } from "react-native";
import * as Speech from "expo-speech";

// MessageManager ist für das Anzeigen von Toasts und das Vorlesen von Nachrichten zuständig
// MessageManager speichert in lastSpeechTimestamps und lastToastTimestamps ab, wann eine bestimmte Nachricht
// zuletzt angezeigt wurde. Dabei wird mit einem 10 Sekunden Cooldown verhindert, 
// dass bestimmte Nachrichten dauerthaft angezeigt werden
// (Beispiel: User ist dauerhaft unter eingestelltem Radius -> so wird nicht dauerhaft der sich in der 
// Nähe befindende Geocache vorgelesen)
class MessageManager {
  static audioEnabled = true;
  static lastSpeechTimestamps = {};
  static lastToastTimestamps = {};

  static setIsAudioEnabled = (audio) => {
    this.audioEnabled = audio;
  };

  static showToastMessage = (text) => {
    const currentTime = new Date().getTime();
    const lastToastTimestamp = this.lastToastTimestamps[text] || -10000;

    if (currentTime - lastToastTimestamp > 10000) {
      ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      this.lastToastTimestamps[text] = currentTime;
    }
  };

  static textToSpeech = (text) => {
    if (this.audioEnabled) {
      const currentTime = new Date().getTime();
      const lastSpeechTimestamp = this.lastSpeechTimestamps[text] || -10000;

      if (currentTime - lastSpeechTimestamp > 10000) {
        Speech.speak(text);

        this.lastSpeechTimestamps[text] = currentTime;
      }
    }
  };
}

export default MessageManager;
