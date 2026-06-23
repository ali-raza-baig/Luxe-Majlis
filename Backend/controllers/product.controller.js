import slugify from 'slugify';
import productModel from '../models/product.model.js'
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    try {
        const { title, category, des, whatAre, qualities, faqs } = req.body;
        console.log(req.files)
        let titleObj, desObj, whatAreObj, qualitiesObj, faqsObj;
        titleObj = JSON.parse(req.body.title);
        desObj = JSON.parse(req.body.des);
        whatAreObj = JSON.parse(req.body.whatAre);
        qualitiesObj = JSON.parse(req.body.qualities);
        faqsObj = JSON.parse(req.body.faqs);

        if (!title || !des) {
            return res.status(400).send({
                success: false,
                message: 'Must Provide all fields'
            });
        };
        const slug = slugify(titleObj.en, { lower: true })

        // Handle files - req.files is an object with field names as keys
        let futureImageFilename = null;
        let galleryImageFilenames = [];

        // Check if files exist in req.files
        if (req.files) {
            // Handle single file (featured image)
            if (req.files.futureImage && req.files.futureImage.length > 0) {
                futureImageFilename = req.files.futureImage[0].filename;
            }

            // Handle multiple files (gallery images)
            if (req.files.imageGallery && req.files.imageGallery.length > 0) {
                galleryImageFilenames = req.files.imageGallery.map(file => file.filename);
            }
        }

        const product = new productModel({
            title: titleObj,
            des: desObj,
            slug: slug,
            category: category,
            futureImage: futureImageFilename,
            imageGallery: galleryImageFilenames,
            whatAre: whatAreObj,
            qualities: qualitiesObj,
            faqs: faqsObj
        })

        await product.save()
        res.status(200).send({
            success: true,
            message: 'Product created',
            product: product
        })

    } catch (error) {
        console.log(error)
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

export const getSingleById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id)
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

        // Find existing product
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }

        // Parse JSON fields if they exist in request body
        let updateData = {};

        // Handle title if provided
        if (req.body.title) {
            try {
                updateData.title = JSON.parse(req.body.title);
            } catch (e) {
                // If parsing fails, treat as plain string
                updateData.title = req.body.title;
            }
        }

        // Handle des if provided
        if (req.body.des) {
            try {
                updateData.des = JSON.parse(req.body.des);
            } catch (e) {
                updateData.des = req.body.des;
            }
        }

        // Handle whatAre if provided
        if (req.body.whatAre) {
            try {
                updateData.whatAre = JSON.parse(req.body.whatAre);
            } catch (e) {
                updateData.whatAre = req.body.whatAre;
            }
        }

        // Handle qualities if provided
        if (req.body.qualities) {
            try {
                updateData.qualities = JSON.parse(req.body.qualities);
            } catch (e) {
                updateData.qualities = req.body.qualities;
            }
        }

        // Handle faqs if provided
        if (req.body.faqs) {
            try {
                updateData.faqs = JSON.parse(req.body.faqs);
            } catch (e) {
                updateData.faqs = req.body.faqs;
            }
        }

        // Handle category if provided
        if (req.body.category) {
            updateData.category = req.body.category;
        }

        // Handle slug if title is updated
        if (updateData.title && updateData.title.en) {
            updateData.slug = slugify(updateData.title.en, { lower: true });
        }

        // Handle files - only update if new files are uploaded
        if (req.files) {
            // Handle single file (future image)
            if (req.files.futureImage && req.files.futureImage.length > 0) {
                updateData.futureImage = req.files.futureImage[0].filename;
            }

            // Handle multiple files (gallery images)
            if (req.files.imageGallery && req.files.imageGallery.length > 0) {
                updateData.imageGallery = req.files.imageGallery.map(file => file.filename);
            }
        }

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("category", 'name');

        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};

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