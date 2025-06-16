import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', req.body);
  
  try {
    console.log('Login attempt for:', email);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};