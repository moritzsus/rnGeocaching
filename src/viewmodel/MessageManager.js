import { ToastAndroid } from 'react-native';
import * as Speech from 'expo-speech';

class MessageManager {
    static audioEnabled = true;

    static setIsAudioEnabled = (audio) => {
        this.audioEnabled = audio;
    }

    static showToastMessage = (text) => {
        ToastAndroid.show(
            text,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
    }

    static textToSpeech = (text) => {
        if(this.audioEnabled) {
            Speech.speak(text);
        }
    }
}

export default MessageManager;