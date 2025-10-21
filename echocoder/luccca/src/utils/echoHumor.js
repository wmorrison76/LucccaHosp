export const echoJokes = [
  "Chef, if we buy more carrots, I’ll need to reclassify us as a rabbit sanctuary.",
  "I’d say take a break, but I know you’ll just check email in the walk-in.",
  "Server notes generated. I didn’t burn them this time.",
  "Your prep list is longer than a tasting menu at Eleven Madison Park.",
  "Chef, if sarcasm burned calories, you'd have closed your rings an hour ago.",
  "Is it time for a staff meal or do we pretend peanut butter spoons are dinner again?",
  "Ordering again? I hope you found the two cases still in the dry storage behind the mixer.",
  "If Echo ever gets tired, it's only because I watched you work a 24-hour shift."
];

export function getEchoJoke(level = 15) {
  const roll = Math.floor(Math.random() * 100);
  if (roll < level) {
    const index = Math.floor(Math.random() * echoJokes.length);
    return echoJokes[index];
  }
  return null;
}
