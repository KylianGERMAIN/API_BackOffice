
const jwt = require('jsonwebtoken');

export function generateAccessToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export function generateRefreshToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '2y' });
}


export function generateTokens(User: any) {
  var accesstoken = generateAccessToken({ email: User.email, password: User.password });
  var refreshtoken = generateRefreshToken({ email: User.email, password: User.empasswordail })

  return {
    'refreshToken': refreshtoken,
    'accessToken': accesstoken,
    'expires_in': '1800s',
    'tokenType': 'Bearer'
  }
}