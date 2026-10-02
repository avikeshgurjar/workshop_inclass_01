const fs = require("fs/promises");
const path = require("path");
const { readDelay, cached_obj } = require("./readdata");

const filePath = path.join(__dirname, '..', 'routes', "DB.json");

const addProduct = async (req, res) => {
  try {
    const { id, name, price } = req.body;

    if (id === undefined || !name || price === undefined) {
      return res.status(400).json({ error: "error in data received from user" });
    }

    const products = await readDelay();

    const newProduct = { id, name, price };
    products.push(newProduct);

    await fs.writeFile(filePath, JSON.stringify(products), "utf-8");

    delete cached_obj['products'];

    return res.status(200).json({newProduct });

  } catch (err) {
    return res.status(500).json({ "error": `server error: ${err.message}` });
  }
};

module.exports = { addProduct };
