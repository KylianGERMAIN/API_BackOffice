
const jwt = require('jsonwebtoken');

export function generateAccessToken(username: any) {
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2y",
  });
}

export function generateRefreshToken(username: any) {
  return jwt.sign(username, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2y",
  });
}


export function generateRefreshAcccesTokens(user: any) {
  var accesstoken = generateAccessToken({ email: user.email, id: user.id });
  var refreshtoken = generateRefreshToken({ email: user.email, id: user.id })

  return {
    'refreshToken': refreshtoken,
    'accessToken': accesstoken,
    'expires_in': '1800s',
    'tokenType': 'Bearer'
  }
}

export function generateAccesToken(user: any) {
  var accesstoken = generateAccessToken({ email: user.email, id: user.id });

  return {
    'accessToken': accesstoken,
    'expires_in': '1800s',
    'tokenType': 'Bearer'
  }
}