// screenshot.js — uses your installed Chrome directly. No downloads.
// Run: node screenshot.js index.html

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const CHROME =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const SIZES = {
  mobile:  "390,844",
  tablet:  "820,1180",
  desktop: "1440,900",
};

const file = process.argv[2] || "index.html";
const url = "file:///" + path.resolve(file).replace(/\\/g, "/");

fs.mkdirSync("screenshots", { recursive: true });

for (const [name, size] of Object.entries(SIZES)) {
  const out = path.resolve(`screenshots/${name}.png`);
  const cmd = `"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=${size} --screenshot="${out}" "${url}"`;
  console.log("→", name);
  execSync(cmd, { stdio: "inherit" });
}

console.log("\n✅ Done. Check ./screenshots");