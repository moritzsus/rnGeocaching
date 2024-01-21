import { ToastAndroid } from "react-native";
import * as Speech from "expo-speech";

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

      // Überprüfe, ob der Text in den letzten 10 Sekunden nicht vorgelesen wurde
      if (currentTime - lastSpeechTimestamp > 10000) {
        Speech.speak(text);

        // Aktualisiere den Zeitstempel für den vorgelesenen Text
        this.lastSpeechTimestamps[text] = currentTime;
      }
    }
  };
}

export default MessageManager;
