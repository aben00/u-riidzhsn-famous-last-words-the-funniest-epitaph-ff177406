// SPDX-License-Identifier: MIT
// Famous Last Words: The Funniest Epitaph — a make.fun program/v1 entry.
//
// What this does: it writes one fixed epitaph, one line of famous last
// words carved in stone, to /output/entry.txt. The line is a constant,
// not generated, so every run produces the same bytes. The program only
// checks the line against the competition's gate (UTF-8 text, 1 to
// 150 characters, not only whitespace) and writes it out.
//
// The epitaph: Dave died doing what he loved — pressing the button
// marked DO NOT PRESS.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one line, 85 characters, a tombstone epitaph of famous last words.
const ENTRY =
  "Here lies Dave. He died doing what he loved: pressing the button marked DO NOT PRESS.";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 150 characters, not only white space.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 150) {
    throw new Error(`entry is ${chars} characters, must be 1-150`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  // One line, as the brief demands: a single line of dying speech
  // carved in stone — no line breaks, no stage directions.
  if (/[\r\n]/.test(ENTRY)) {
    throw new Error("entry must be a single line");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the epitaph,
  // 85 characters, so the gate and the judge both see only the line.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
