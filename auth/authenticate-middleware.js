/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const secretCode = require('./secret')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    return res.status(401).json({ message: 'Token is not exist' })
  }
  jwt.verify(token, secretCode.secretCode, (error, decodedToken) => {
    if(err) return res.status(401).json({ message: 'Not an authorized token' })
    req.decodedToken = decodedToken
    next()
  })
};
