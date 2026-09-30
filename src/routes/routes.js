const router = require("express").Router();
// const { rejects } = require("assert/strict");
// const { error } = require("console");
const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "DB.json");
console.log(filePath);

let cached_obj = {};



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

router.get("/", async (req, res) => {
  try {
    const key = 'products';

    if (cached_obj[key]) {
      return res.status(200).json(cached_obj[key])
      
    }
    else {
      const data = await readDelay()
      cached_obj[key] = data
      return res.status(200).json(data);
    }
    
    
  } catch (err) {
    return res.status(500).json({ error: `this is the ${err}` });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const p_id = Number(req.params.id);
    const p_key = `product${p_id}`

    if (cached_obj[p_key]) {
      return res.status(200).json(cached_obj[p_key]);
      
    } else {
      
      const data = await readDelay();

      const find_product =  data.find((x) => x.id === p_id);

      if (find_product) {
        cached_obj[p_key] = find_product
        return res.status(200).json(find_product)
      } else {
        return res.status(205).json({ error: `product not found` });
      }
      
      
      
    }

    
  } catch (err) {
    
    return res.status(500).json({ error: `this is the ${err}` });
  }
});


module.exports = router;
