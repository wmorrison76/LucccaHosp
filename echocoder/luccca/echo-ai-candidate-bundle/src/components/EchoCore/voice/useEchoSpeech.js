// File: src/components/EchoCore/voice/useEchoSpeech.js
// [TEAM LOG: Voice] - Basic TTS wrapper
export default function useEchoSpeech() {
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };
  return { speak };
}
