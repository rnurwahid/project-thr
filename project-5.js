// Project membuat program ngobrol dengan AI

import { getDoc } from "./utils.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { join } from "path";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

const rl = readline.createInterface({ input, output });

const { authKey } = JSON.parse(fs.readFileSync("./config.json", "UTF-8"));
console.clear();
console.log(`Project Chat AI Gpt 4\n\n\n`);

(async function Runner() {
    const text = await rl.question("Tulis Pesan anda: ");
    getDoc("/ai/gpt4", { text }, authKey)
        .then(async res => {
            try {
                let result = JSON.parse(res);
                if (result.error) throw result.message;
                result = result.data;
                console.log(result);
            } catch (e) {
                if (typeof e === "string")
                    return console.log(
                        `Maaf, silahkan coba ulang.\nKesalahan: ${e}`
                    );
                console.log(`Maaf, silahkan coba ulang`);
            } finally {
                Runner();
            }
        })
        .catch(err => {
            rl.close();
            console.log(err);
        });
})();
