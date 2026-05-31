import consModel from "../models/consultation.model.js";

export const createMessage = async (req, res) => {
    try {
        const { name, email, phone, city, message } = req.body;
        if (!name || !phone || !message) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        };

        const messageCreate = consModel({
            name, email, phone, city, message
        });
        await messageCreate.save();

        res.status(200).send({
            success: true,
            message: 'Message sent.'
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
        console.log(`Error in controller : ${error}`)
    }
}

export const getMessage = async (req, res) => {
    try {
        const { fromDate, toDate, city } = req.query;

        let filter = {};
        if (city) {
            filter.city = city;
        };

        if (fromDate || toDate) {
            filter.createdAt = {}
            if (fromDate) filter.createdAt.$gte = Date(fromDate);
            if (toDate) filter.createdAt.$lte = Date(toDate);
        }

        const message = await consModel.find(filter).sort({ _id: -1 });

        res.status(200).send({
            success: true,
            message: 'All messsages ',
            message: message
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
        console.log(`Error in controller : ${error}`)
    }
}

export const excelFile = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
        console.log(`Error in controller : ${error}`)
    }
}