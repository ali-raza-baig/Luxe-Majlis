import slugify from 'slugify'
import categoryModel from '../models/category.model.js'

export const createCategory = async (req, res) => {
  try {
    const { faq, hero, whyChoice, seo, name } = req.body;

    const slug = slugify(name, { lower: true });

    const category = new categoryModel({
      slug,
      hero,
      faq,

      whyChoice: {
        title: whyChoice?.title,
        cards: whyChoice?.cards || []
      },

      seo,
      name
    });

    await category.save();

    res.status(200).send({
      message: "Category created successfully",
      success: true,
      data: category
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "internal server error",
      success: false
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({}, { name: 1, hero: 1, slug: 1, createdAt: 1 }).sort({ _id: -1 })
    if (!categories) {
      return res.status(400).send({
        success: false,
        message: 'Not found'
      })
    }

    res.status(200).send({
      success: true,
      message: 'All categories',
      categories: categories
    });


  } catch (error) {
    res.status(500).send({
      message: 'internal server error',
      success: false
    })
  }
}

export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).send({
        success: false,
        message: 'Slug is required'
      });
    };

    const category = await categoryModel.findOne({ slug: slug })

    if (!category) {
      return res.status(400).send({
        success: false,
        message: 'category not found'
      })
    };

    res.status(200).send({
      success: true,
      category: category
    });

  } catch (error) {
    res.status(500).send({
      message: 'internal server error',
      success: false
    })
  }
}