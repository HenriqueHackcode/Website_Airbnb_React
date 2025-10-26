import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'aGV1aGVpdTE5MzIzMTBlaHVpZWhpYWUwMTJ1ZWhhZTk4MTJoMw==';

export const JWTVerify = (req) => {
  const { token } = req.cookies;

  if (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
        if (error) {
          console.error('JWT verification error:', error);
          return reject(error);
        }

        return resolve(userInfo);
      });
    });
  } else {
    return null;
  }
};

export const JWTSign = (newUserObj, res) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      newUserObj,
      JWT_SECRET_KEY,
      { expiresIn: '30d' },
      (error, token) => {
        if (error) {
          console.error('JWT signing error:', error);
          res.status(500).json(error);
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};
