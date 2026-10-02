const router = require("express").Router();
const fs = require("fs/promises");
const path = require("path");

const {readDelay,cached_obj} = require('../controllers/readdata')
// console.log(cached_obj)
const {fetch_products,fetchById} = require("../controllers/getControllers")
const { addProduct } = require("../controllers/postController")
const { deleteProduct } = require("../controllers/deleteController")
const { updateProduct } = require("../controllers/patchController")

// const filePath = path.join(__dirname, "DB.json");
// async function readDATA() {
//   let products = await fs.readFile(filePath, "utf-8");
//   return JSON.parse(products);
// }

router.get("/", fetch_products);
router.get("/:id", fetchById);

router.post('/', addProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

module.exports = router;
