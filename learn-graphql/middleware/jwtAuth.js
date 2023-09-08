import jwt from 'jsonwebtoken';

export const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  let user = null;
  if (authHeader) {
    const splitAuthHeader = authHeader.split(' ');
    const token = splitAuthHeader[1];
    if (token) {
      user = jwt.verify(token, 'secret');
    }
  }
  req.user = user;
  next();
};
