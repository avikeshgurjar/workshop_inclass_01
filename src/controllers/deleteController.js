const fs = require("fs/promises");
const path = require("path");
const { readDelay, cached_obj } = require("./readdata");

const filePath = path.join(__dirname, '..', 'routes', "DB.json");

const deleteProduct = async (req, res) => {
  try {
    const p_id = Number(req.params.id);

    if (isNaN(p_id)) {
      return res.status(400).json({ error: "product id is incorrect" });
    }

    const products = await readDelay();

    const deletedProduct = products.find((p) => Number(p.id) === p_id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "product is not in DB" });
    }

    const updatedProducts = products.filter((p) => Number(p.id) !== p_id);

    await fs.writeFile(filePath, JSON.stringify(updatedProducts), "utf-8");

    delete cached_obj['products'];
    delete cached_obj[`product${p_id}`];

    return res.status(200).json({ product: deletedProduct });


  } catch (err) {
    return res.status(500).json({ error: `server error: ${err.message}` });
  }
};

module.exports = { deleteProduct };
