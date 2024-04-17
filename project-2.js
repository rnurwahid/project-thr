// Project membuat instagram downloader
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { join } from "path";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import { getDoc, getBuffer } from "./utils.js";

const rl = readline.createInterface({ input, output });

const { authKey } = JSON.parse(fs.readFileSync("./config.json", "UTF-8"));
console.clear();
console.log(`Project download video from instagram\n\n\n`);

const url = await rl.question("Silahkan masukan URL Video Reels instagram: ");
const path = join("database", "project-2");

getDoc("/download/instagram", { url }, authKey)
    .then(res => {
        try {
            let result = JSON.parse(res);
            if (result.error) throw result.message;
            result = result.data;
            console.log("sedang mendapatkan result");
            result.forEach(async media => {
                if (media.url && media.url.startsWith("https")) {
                    const buffer = await getBuffer(media.url);
                    const { ext } = await fileTypeFromBuffer(buffer);
                    fs.writeFileSync(
                        join(path, `Downloader-instagram-${Date.now()}.${ext}`),
                        buffer
                    );
                }
            });
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
