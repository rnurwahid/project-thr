// Project Screenhot website

import { getDoc, getBuffer } from "./utils.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { join } from "path";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

const rl = readline.createInterface({ input, output });

const { authKey } = JSON.parse(fs.readFileSync("./config.json", "UTF-8"));
console.clear();
console.log(`Project screenshot website\n\n\n`);

const url = await rl.question(
    "Silahkan masukan URL Yang akan anda ambil SS web nya: "
);
const path = join("database", "project-3");

getDoc("/tool/ssweb", { url }, authKey)
    .then(async res => {
        try {
            let result = JSON.parse(res);
            if (result.error) throw result.message;
            result = result.data;
            console.log("sedang mendapatkan result");
            const buffer = await getBuffer(result.image);
            const { ext } = await fileTypeFromBuffer(buffer);
            fs.writeFileSync(
                join(path, `Screenshot-website-${Date.now()}.${ext}`),
                buffer
            );
            console.log(`sukses menyimpannya di path: ${path}`);
        } catch (e) {
            if (typeof e === "string")
                return console.log(
                    `Maaf, silahkan coba ulang.\nKesalahan: ${e}`
                );
            console.log(`Maaf, silahkan coba ulang`);
        } finally {
            rl.close();
        }
    })
    .catch(err => {
        rl.close();
        console.log(err);
    });
