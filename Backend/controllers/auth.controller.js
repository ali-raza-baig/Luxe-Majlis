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
        const token = await createToken({ email: email, id: user._id })
        res.status(200).send({
            success: true,
            message: 'Successfully registered',
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        })
    } catch (error) {
        console.log(error)
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

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            })
        };
        const token = await createToken({ email: email, id: user._id })
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export { registerController, loginController }