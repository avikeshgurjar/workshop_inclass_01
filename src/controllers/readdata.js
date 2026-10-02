const fs = require("fs/promises");
const path = require("path");
let cached_obj = {};

const filePath = path.join(__dirname, '..','routes', "DB.json");

console.log(filePath);




async function readDATA() {
  let products = await fs.readFile(filePath, "utf-8");
  return JSON.parse(products);
}

async function readDelay() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });
  return await readDATA();
}
module.exports = {'readDelay':readDelay,'cached_obj':cached_obj}