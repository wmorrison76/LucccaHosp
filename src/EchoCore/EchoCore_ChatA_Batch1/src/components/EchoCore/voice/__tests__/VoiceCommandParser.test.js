import parseVoiceCommand from "../VoiceCommandParser";

test("parses known voice commands", () => {
  expect(parseVoiceCommand("Hello Echo")).toBe("greet");
  expect(parseVoiceCommand("Show finance report")).toBe("finance");
  expect(parseVoiceCommand("Random input")).toBe(null);
});
