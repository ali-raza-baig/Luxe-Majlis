import jwt from 'jsonwebtoken';

export const createToken = async ({ email, id, res }) => {
    const token = jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.cookie('luxeMijlas', token, {
        httpOnly: true,                    // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS
        sameSite: 'strict',                // Protects against CSRF
        maxAge: 2592000
    })
}