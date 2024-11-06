const { getAllProducts,getProductById, getProductsByCaregory } = require('../services/productService');

// Controller for fetching all products
const allProducts = async (req,res)=>{
    const {category} = req.query;
    try{
        let products;
        if(category) products = await getProductsByCaregory(category);
        else products = await getAllProducts();
        if(!products.length) return res.status(400).send("Not found !")
        res.status(200).json({status:"Success",data:products});
    }catch(error){
        console.log('Error fetching products : ',error);
        res.status(500).json({ message: 'Server error while fetching products !' });
    }
}

// Controller for fetching product by id
const productById = async (req,res)=>{
    try{
        const product = await getProductById(req.params.id);
        if(!product.length) return res.status(400).send("Not found !")
        res.status(200).json({status:"Success",data:product});
    }catch(error){
        console.log('Error fetching products : ',error);
        res.status(500).json({ message: 'Server error while fetching products !' });
    }
}

module.exports = {
    allProducts,
    productById,
}