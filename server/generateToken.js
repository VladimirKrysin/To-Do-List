import jwt from 'jsonwebtoken'


export const createSecretToken = (id) => {
  console.log(jwt);
  
  return jwt.sign({ id }, 'private key', {
    expiresIn: 3 * 24 * 60 * 60,
  });
};