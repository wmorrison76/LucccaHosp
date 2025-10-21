// [TEAM LOG: Chat A] - Mock Whisper-based speech-to-text service
export default class SpeechToTextService {
  constructor() {
    this.recognizer = null;
  }

  start(callback) {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech Recognition not supported");
      return;
    }
    this.recognizer = new window.webkitSpeechRecognition();
    this.recognizer.continuous = true;
    this.recognizer.interimResults = true;
    this.recognizer.onresult = (event) => {
      const text = Array.from(event.results)
        .map((res) => res[0].transcript)
        .join("");
      callback(text);
    };
    this.recognizer.start();
  }

  stop() {
    if (this.recognizer) {
      this.recognizer.stop();
    }
  }
}
