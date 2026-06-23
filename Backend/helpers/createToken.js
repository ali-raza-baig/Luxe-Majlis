import jwt from 'jsonwebtoken';

export const createToken = async ({ email, id }) => {
    const token = jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token;
}