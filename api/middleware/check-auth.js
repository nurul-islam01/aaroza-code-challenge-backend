const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        console.log(token)
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        req.userData = decode;

        next();
    }catch (e) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};
