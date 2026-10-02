const data= require("./readdata")
const cached_obj = data.cached_obj;

const fetch_products = async (req, res) => {
    try {
      const key = 'products';
  
      if (cached_obj[key]) {
        res.setHeader('X-Cache', 'HIT')
        return res.status(200).json(cached_obj[key])
        
      }
      else {
        const products = await data.readDelay()
        cached_obj[key] = products
        res.setHeader('X-Cache', 'MISS')

        return res.status(200).json(products)
        
      }
      
      
    } catch (err) {
      return res.status(500).json({ error: `this is the ${err}` });
    }
}

const fetchById = async (req, res) => {
  try {
    const p_id = Number(req.params.id);
    if (isNaN(p_id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
    }
    const p_key = `product${p_id}`
    

    if (cached_obj[p_key]) {
      res.setHeader('X-Cache', 'HIT')

      return res.status(200).json(cached_obj[p_key]);
      
    } else {
      res.setHeader('X-Cache', 'MISS');
      const products = await data.readDelay();

      const find_product =  products.find((x) => x.id === p_id);

      if (find_product) {
        cached_obj[p_key] = find_product
        // console.log(cached_obj)
        

        return res.status(200).json(find_product)
      } else {
        return res.status(404).json({ error: `product not found` });
      }
      
      
      
    }

    
  } catch (err) {
    
    return res.status(500).json({ error: `this is the ${err}` });
    
  }
}

module.exports = { 'fetch_products': fetch_products, 'fetchById': fetchById }


