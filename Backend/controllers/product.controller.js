import slugify from 'slugify';
import productModel from '../models/product.model.js'
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    try {

        const { title, category, des, whatAre, qualities, faqs } = req.body;

        if (!title || !category || !des) {
            return res.status(400).send({
                success: false,
                message: 'Must Provide all fields'
            });
        };

        const slug = slugify(title.en, { lower: true })

        const product = new productModel({
            title, category, des, slug,
            imageGallery: req.files.imageGallery.map(file => file.filename),
            futureImage: req.files.futureImage[0].filename,
            whatAre: {
                title: whatAre.title,
                des: whatAre.des
            },
            qualities, faqs
        })

        await product.save()
        res.status(200).send({
            success: true,
            message: 'Product created',
            product: product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}


export const getByQuery = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = new mongoose.Types.ObjectId(category);
        }

        const products = await productModel
            .find(filter, {
                title: 1,
                futureImage: 1,
                imageGallery: 1,
                slug: 1,
                category: 1,
                _id: 1
            }).populate("category", 'name')
            .sort({ _id: -1 });

        if (!products.length) {
            return res.status(404).send({
                success: false,
                message: "No products found for this category"
            });
        }

        res.status(200).send({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "internal server error"
        });
    }
};

export const getSingle = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug: slug })
        if (!product) {
            return res.status(400).send({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).send({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!product) {
            return res.status(409).send({
                success: false,
                message: 'Product failed to update'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Product update',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Id must be required'
            })
        }

        const deleteProduct = await productModel.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(409).send({
                success: false,
                message: 'Product Not deleted'
            })
        };

        res.status(200).send({
            success: true,
            message: 'Product deleted',
            deleteProduct
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}