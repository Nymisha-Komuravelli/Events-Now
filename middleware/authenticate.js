const jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {
    //get token from header
    const token = request.header("x-auth-token");
    if(!token){
        return response.status(401).json({message: "No token provided, authentication denied"});
    }

    //verify the token
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        request.user = decoded.user;
        next();
    } catch(error) {
        response.status(401).json({message: "Token is not valid"});
    }
}

module.exports = authenticate;