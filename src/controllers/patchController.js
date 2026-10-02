const fs = require("fs/promises");
const path = require("path");
const { readDelay, cached_obj } = require("./readdata");

const filePath = path.join(__dirname, '..', 'routes', "DB.json");

const updateProduct = async (req, res) => {
  try {
    const p_id = Number(req.params.id);

    if (isNaN(p_id)) {
      return res.status(400).json({ error: "product id is incorrect" });
    }

    const { name, price } = req.body;

    if (!name && !price) {
      return res.status(400).json({ error: "data is not received from user" });
    }

    const products = await readDelay();

    const product = products.find((p) => Number(p.id) === p_id);

    if (!product) {
      return res.status(404).json({ error: "product is not in DB" });
    }

    if (name) product.name = name;
    if (price) product.price = price;

    await fs.writeFile(filePath, JSON.stringify(products), "utf-8");

    delete cached_obj['products'];
    delete cached_obj[`product${p_id}`];

    return res.status(200).json({ product });

  } catch (err) {
    return res.status(500).json({ error: `server error: ${err.message}` });
  }
};

module.exports = { updateProduct };
