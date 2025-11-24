import fs from 'fs';

const value = fs.readFileSync('./info.txt', 'utf8');
const text = value.replace("GEEK.geekitemPreload =", "").replaceAll(";", "").trim();
const json = JSON.parse(text);

console.log(JSON.stringify(json, null, 4));

// weitere Verarbeitung...
