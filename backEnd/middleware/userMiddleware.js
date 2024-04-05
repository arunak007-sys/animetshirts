const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const userMiddleware = (req,res,next) => {
    const token = req.headers.authorization || req.cookies.token;

    console.log('Token :' , token)
    if(!token){
        return res.status(401).json({message : 'Unauthorized - No token provided' })
    }
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true,
    })
}
catch (err){
    console.log('Error in userMiddleware : ', err)
    ress.status(401).json({ message : 'Unauthorized - Invalid token'})
}

module.exports = userMiddleware;