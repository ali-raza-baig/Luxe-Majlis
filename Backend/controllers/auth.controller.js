import { createToken } from "../helpers/createToken.js";
import userModel from "../models/user.model.js";


const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        };

        const user = userModel({
            email, password, name
        })

        await user.save()
        createToken({ email: email, id: user._id, res: res })
        res.status(200).send({
            success: true,
            message: 'Successfully registered'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        };

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid user'
            })
        };

        const isMatch = await userModel.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            })
        };
        createToken({ email: email, id: user._id, res: res })
        return res.status(200).send({
            success: true,
            message: 'Login Successfully'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export { registerController, loginController }