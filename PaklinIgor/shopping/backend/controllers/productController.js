const Product = require('../models/product');

    exports.getProducts = async (req,res,next) => {
        const products = await Product.find({bought: 0});
        res.status(200).send(products);
    }

    exports.addProduct = async (req,res,next) => {
        const {name,description,quantity} = req.body;

        const product = await Product.create({name,description,quantity});

        res.status(200).send(product);
    }

    exports.updateProduct = async (req,res,next) => {
        const id = req.params.idProduct;
        const {name,description,quantity} = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({message:'product not found'});
        }
        if (name) product.name = name;
        if (description) product.description = description;
        if (quantity) product.quantity = quantity;
        product.save();

        res.status(200).send(product);
    }

    exports.deleteProduct = async (req,res,next) => {
        const id = req.params.idProduct;

        await Product.findByIdAndRemove(id);

        res.status(200).send({message: "successfully"});
    }

    exports.buyProduct = async (req,res,next) => {
        const id = req.params.idProduct;

        const product = await Product.findById(id);
        if (!product || product.bought) {
            return res.status(404).send({message:'product not found'});
        }
        product.bought = new Date().getTime();
        product.save();

        res.status(200).send(product);
    }
