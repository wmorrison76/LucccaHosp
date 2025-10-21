// [TEAM LOG: Chat A] - Simple NLP parser for voice commands
const commands = {
  greet: ["hello echo", "hi echo"],
  dashboard: ["open dashboard", "show dashboard"],
  finance: ["show finance", "finance report"],
};

export default function parseVoiceCommand(input) {
  const text = input.toLowerCase();
  for (const [cmd, triggers] of Object.entries(commands)) {
    if (triggers.some((phrase) => text.includes(phrase))) return cmd;
  }
  return null;
}
