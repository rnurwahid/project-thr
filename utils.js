import https from "node:https";
import querystring from "node:querystring";

// Function untuk mendapatkan json
export async function getDoc(path, data, authKey) {
    return new Promise(async function (resolve, reject) {
        var postData = querystring.stringify(data);

        https
            .get(
                `https://api.airinn.site${path}?${postData}`,
                {
                    headers: {
                        authorization: `Bearer ${authKey}`
                    }
                },
                res => {
                    let data = "";
                    res.on("data", chunk => {
                        data += chunk;
                    });
                    res.on("end", () => resolve(data));
                }
            )
            .on("error", err => reject(err));
    });
}

// function untuk mengambil buffer dri url
export async function getBuffer(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, {}, res => {
                let data = Buffer.from([]);
                res.on("data", chunk => {
                    data = Buffer.concat([data, chunk]);
                });
                res.on("end", () => resolve(data));
            })
            .on("error", reject);
    });
}
