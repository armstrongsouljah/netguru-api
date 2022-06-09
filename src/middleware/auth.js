const jwt = require('jsonwebtoken');
const { JWT_SECRET='mysecret' } = process.env;
const { STATUS_CODES } = require('../utils');
const { HTTP_NOT_AUTHORIZED } = STATUS_CODES

const auth = async (req, res, next) => {
    /*
      Authorization middleware for requests to protected resources
      req: Request Object
      res: Response Object
      @raises: Not Authorized 401
      @returns: HTTP Ok
    */
    let  token = req.header('Authorization');

    if(token) {
        token = token.replace('Bearer ', '');
    } else {
        token = null;
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        
        if(!data) {
            throw new Error();
        }

        req.user = data;
        req.token = token;

        next()
    } catch (err) {
       res.status(HTTP_NOT_AUTHORIZED).send({ message: "Not authorized to access this resource"})
    }
}
exports.auth = auth;
