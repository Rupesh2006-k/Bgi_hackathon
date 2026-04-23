import jwt from 'jsonwebtoken'

const generateToken = ({ userId, secret ,exTime}) => {
  return jwt.sign({ _id: userId }, secret, { expiresIn: exTime })
}

export default generateToken
