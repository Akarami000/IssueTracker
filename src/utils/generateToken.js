import jwt from 'jsonwebtoken';
import config from 'config';

const secret = config.get('jwtSecret');
function generateToken(user) {
  return jwt.sign({ user: { id: user.id } }, secret, { expiresIn: '1d' });
}

export default generateToken;
