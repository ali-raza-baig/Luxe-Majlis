import jwt from 'jsonwebtoken'

export const isVerified = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization;
        console.log(token)
        if (!token) {
            return res.status(400).send({
                success: false,
                message: 'Token not found'
            })
        };

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Token. Please login.'
            })
        };

        next();

    } catch (error) {
        console.log(`Error in isVerified middleware : ${error}`)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}