// [TEAM LOG: Chat A] - TTS hook with voice moods
export default function useEchoSpeech() {
  const speak = (text, mood = "default") => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = mood === "calm" ? 0.9 : mood === "excited" ? 1.2 : 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };
  return { speak };
}
