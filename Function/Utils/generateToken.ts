
const jwt = require('jsonwebtoken');

export function generateAccessToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export function generateRefreshToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '2y' });
}


export function generateTokens(user: any) {
  var accesstoken = generateAccessToken({ email: user.email, id: user.id });
  var refreshtoken = generateRefreshToken({ email: user.email, id: user.id })

  return {
    'refreshToken': refreshtoken,
    'accessToken': accesstoken,
    'expires_in': '1800s',
    'tokenType': 'Bearer'
  }
}