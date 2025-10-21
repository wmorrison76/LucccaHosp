import fs from "fs";
const log = JSON.parse(fs.readFileSync("/Users/cami/Desktop/LUCCCA/scripts/.style-system-log.json", "utf8"));
for (const c of log.changes) {
  if (c.backup && fs.existsSync(c.backup)) {
    fs.copyFileSync(c.backup, c.file);
    console.log("reverted", c.file);
  }
}
console.log("Done. You can delete /Users/cami/Desktop/LUCCCA/scripts/.style-system-log.json and the backups if you like.");
