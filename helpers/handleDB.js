import { existsSync, readFileSync, writeFileSync } from "fs";

const file = "./db/data.json";

function saveDB(data) {
    data = JSON.stringify(data);
    writeFileSync(file, data);
}

function readDB() {
    if (!existsSync(file)) {
        return null;
    }

    const info = readFileSync(file, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return data;
}

export { saveDB, readDB };
