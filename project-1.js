// Project meng-konvert text ke QR-Code

import qrcode from "qrcode";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { join } from "path";
import fs from "fs";

const rl = readline.createInterface({ input, output });

console.clear();
console.log(`Project convert text to qrcode\n\n\n`);

const text = await rl.question("Silahkan masukan Textnya: ");
const path = join("database", `CONVERT_TEXT_2_QRCODE` + Date.now() + ".png");

await qrcode
    .toDataURL(text)
    .then(result => Buffer.from(result.split(",")[1], "base64"))
    .then(result => {
        fs.writeFileSync(path, result);
        console.log(`QR saved on path /database/project-1`);
    })
    .catch(err => console.log(`Maaf terjadi kesalahan, silahkan ulangi`));

rl.close();
