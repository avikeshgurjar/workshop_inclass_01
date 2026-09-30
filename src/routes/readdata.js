const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "DB.json");
async function readDATA() {
  let products = await fs.readFile(filePath, "utf-8");
  return JSON.parse(products);
}

console.log(readDATA())